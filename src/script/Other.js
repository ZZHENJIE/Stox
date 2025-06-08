import { fetch } from "@tauri-apps/plugin-http";

export async function Wallstreetcn_Calendar(start, end) {
    const url = 'https://api-one-wscn.awtmt.com/apiv1/finance/macrodatas?start=' + start + '&end=' + end;
    return fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
}

export async function Cboe_Book_Viewer(symbol, market) {
    const url = 'https://www.cboe.com/json/' + market + '/book/' + symbol;
    return fetch(url, {
        method: 'GET',
        headers: {
            referer: 'https://www.cboe.com/us/equities/market_statistics/book_viewer/'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
}

export async function Akamai_Timestamp() {
    const url = 'https://time.akamai.com';
    return fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
}

export function FormatTime(timestamp, format, timezone = 8) {
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

export default {
    Wallstreetcn_Calendar,
    Cboe_Book_Viewer,
    Akamai_Timestamp,
    FormatTime
}