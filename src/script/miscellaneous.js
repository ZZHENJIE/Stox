import CryptoJS from 'crypto-js';

/**
 * 生成 SHA-256 哈希
 * @param {string} text - 要哈希的文本
 * @param {string} [key] - 可选密钥
 * @returns {string} 哈希结果
 */
function generateSHA256(text, key) {
    return CryptoJS.SHA256(text, key).toString();
}

/**
 * 安全序列化对象（过滤undefined值）
 * @param {Object} obj - 要序列化的对象
 * @returns {string} JSON字符串
 */
function safeStringify(obj) {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
            result[key] = String(obj[key]);
        }
    });
    return JSON.stringify(result);
}

/**
 * 生成 HMAC-SHA512 签名
 * @param {string} text - 要签名的文本
 * @param {string} key - 密钥
 * @returns {string} 签名结果
 */
function generateHMAC(text, key) {
    return CryptoJS.HmacSHA512(text, key).toString();
}

/**
 * 生成短令牌（截取哈希部分内容）
 * @param {string} data - 原始数据
 * @returns {string} 10字符的令牌
 */
function generateShortToken(data) {
    const input = data || "{}";
    const hmac = generateHMAC(input, "quote_web");
    return generateSHA256(hmac.slice(0, 10)).slice(0, 10);
}

// 请求配置常量（冻结对象防止修改）
const REQUEST_CONFIG = Object.freeze({
    transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
    },
    adapter: ["xhr", "http"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 5000,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
        Accept: "application/json, text/plain, */*",
        "futu-x-csrf-token": "1"
    },
    baseURL: "/quote-api/quote-v2",
    params: {},
    method: "get",
    url: "/get-news-list"
});

/**
 * 获取API请求令牌
 * @param {Object} params - 请求参数
 * @returns {string} 生成的令牌
 */
export function Futu_Get_API_Token(params) {
    const config = { ...REQUEST_CONFIG };
    config.params = { ...config.params, ...params };

    const inputData = config.data ?
        JSON.stringify(config.data) :
        safeStringify(config.params);

    return generateShortToken(inputData);
}

export function Format_Time(timestamp, format, timezone = 8) {
    const ts = timestamp < 10000000000 ? timestamp * 1000 : timestamp;

    const date = new Date(ts);

    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const timezoneMs = timezone * 3600 * 1000;
    const adjustedDate = new Date(date.getTime() + timezoneOffset + timezoneMs);

    const pad = (n) => n.toString().padStart(2, '0');

    const year = adjustedDate.getFullYear();
    const month = pad(adjustedDate.getMonth() + 1);
    const day = pad(adjustedDate.getDate());
    const hours = pad(adjustedDate.getHours());
    const minutes = pad(adjustedDate.getMinutes());
    const seconds = pad(adjustedDate.getSeconds());

    const formatMap = {
        'yyyy': year,
        'mm': month,
        'dd': day,
        'hh': hours,
        'MM': minutes,
        'ss': seconds
    };

    return format.replace(/(yyyy|mm|dd|hh|MM|ss)/g, (match) => formatMap[match]);
}

export const Finviz_Api_Token = '1e3ab083-4d40-48cd-9218-ea042376b56e';

export default {
    Finviz_Api_Token,
    Futu_Get_API_Token,
    Format_Time
}