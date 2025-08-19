import { fetch, type ClientOptions } from "@tauri-apps/plugin-http";
import { useDiscreteApi } from "../plugins/DTBox";
export function MFetch(input: URL | Request | string, init?: RequestInit & ClientOptions): Promise<Response> {
    return new Promise((resolve, reject) => fetch(input, init)
        .then(response => {
            if (!response.ok) {
                useDiscreteApi().message.error(`Status: ${response.status}`, {
                    duration: 3000
                });
            }
            resolve(response);
        })
        .catch(error => {
            useDiscreteApi().message.error(`MFetch: ${error}`, {
                duration: 3000
            });
            reject(error);
        }));
}
async function Akamai_Timestamp() {
    const url = 'https://time.akamai.com';
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
}

function Url_Params_Insert(url: string, params: object) {
    const Url = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
        Url.searchParams.set(key, value);
    });
    return Url;
}

function Format_Time(timestamp: number, format: string, timezone: number = 8) {
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
    Akamai_Timestamp,
    Url_Params_Insert,
    Format_Time
}