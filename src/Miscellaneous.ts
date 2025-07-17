import CryptoJS from 'crypto-js';

/**
 * 生成 SHA-256 哈希
 * @param {string} text - 要哈希的文本
 * @param {string} [key] - 可选密钥
 * @returns {string} 哈希结果
 */
function generateSHA256(text: string, key?: string): string {
    return CryptoJS.SHA256(text, key).toString();
}

/**
 * 安全序列化对象（过滤undefined值）
 * @param {Object} obj - 要序列化的对象
 * @returns {string} JSON字符串
 */
function safeStringify(obj: Record<string, any>): string {
    const result: Record<string, string> = {};
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
function generateHMAC(text: string, key: string): string {
    return CryptoJS.HmacSHA512(text, key).toString();
}

/**
 * 生成短令牌（截取哈希部分内容）
 * @param {string} data - 原始数据
 * @returns {string} 10字符的令牌
 */
function generateShortToken(data: string): string {
    const input = data || "{}";
    const hmac = generateHMAC(input, "quote_web");
    return generateSHA256(hmac.slice(0, 10)).slice(0, 10);
}

// 定义请求配置类型
interface RequestConfig {
    transitional: {
        silentJSONParsing: boolean;
        forcedJSONParsing: boolean;
        clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: (null | ((data: any, headers?: any) => any))[];
    transformResponse: (null | ((data: any) => any))[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Record<string, any>;
    headers: {
        Accept: string;
        "futu-x-csrf-token": string;
        [key: string]: any;
    };
    baseURL: string;
    params: Record<string, any>;
    method: string;
    url: string;
    data?: any;
}

// 请求配置常量（冻结对象防止修改）
const REQUEST_CONFIG: Readonly<RequestConfig> = Object.freeze({
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
export function Futu_Get_API_Token(params: Record<string, any>): string {
    const config: RequestConfig = { ...REQUEST_CONFIG };
    config.params = { ...config.params, ...params };

    const inputData = config.data ?
        JSON.stringify(config.data) :
        safeStringify(config.params);

    return generateShortToken(inputData);
}

/**
 * 格式化时间
 * @param {number} timestamp - 时间戳
 * @param {string} format - 格式字符串
 * @param {number} [timezone=8] - 时区（默认东八区）
 * @returns {string} 格式化后的时间字符串
 */
export function Format_Time(timestamp: number, format: string, timezone: number = 8): string {
    const ts = timestamp < 10000000000 ? timestamp * 1000 : timestamp;

    const date = new Date(ts);

    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const timezoneMs = timezone * 3600 * 1000;
    const adjustedDate = new Date(date.getTime() + timezoneOffset + timezoneMs);

    const pad = (n: number): string => n.toString().padStart(2, '0');

    const year = adjustedDate.getFullYear();
    const month = pad(adjustedDate.getMonth() + 1);
    const day = pad(adjustedDate.getDate());
    const hours = pad(adjustedDate.getHours());
    const minutes = pad(adjustedDate.getMinutes());
    const seconds = pad(adjustedDate.getSeconds());

    const formatMap: Record<string, string | number> = {
        'yyyy': year,
        'mm': month,
        'dd': day,
        'hh': hours,
        'MM': minutes,
        'ss': seconds
    };

    return format.replace(/(yyyy|mm|dd|hh|MM|ss)/g, (match) => String(formatMap[match]));
}

export default {
    Futu_Get_API_Token,
    Format_Time
};