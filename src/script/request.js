import { fetch } from "@tauri-apps/plugin-http";
import { Futu_Get_API_Token, Finviz_Api_Token } from "../script/miscellaneous";

export async function Finviz_Export_Screener(parameter) {
    const url = 'https://elite.finviz.com/export.ashx?v=111&' + parameter + '&auth=' + Finviz_Api_Token;
    return fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    });
}

export async function Futu_Search(params) {
    const url = 'https://www.futunn.com/search-stock/predict?keyword=' + symbol;
    return fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    });
}

export async function Futu_Get_News_List(stock_id) {
    const params = {
        stock_id: stock_id,
        market_type: 2,
        type: 0,
        subType: 0,
    };
    const url = 'https://www.futunn.com/quote-api/quote-v2/get-news-list?stock_id=' + stock_id + '&market_type=2&type=0&subType=0';
    const token = Futu_Get_API_Token(params);
    return fetch(url, {
        method: 'GET',
        headers: {
            'quote-token': token,
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    });
}

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

export async function Spac_Research_Calendar() {
    const url = 'https://www.spacresearch.com/calendar';
    const response = await fetch(url, {
        method: 'GET'
    });
    const html = await response.text();
    const parser = new DOMParser();
    const result = [];
    const doc = parser.parseFromString(html, 'text/html');

    const calendar = doc.getElementById('calendar');
    if (!calendar) {
        return result
    };

    const days = calendar.querySelectorAll('.days .day');

    days.forEach(day => {
        if (day.className != 'day other-month ') {
            const dateElement = day.querySelector('.date');
            if (!dateElement) {
                return
            };

            const date = dateElement.textContent.trim();

            const eventElements = day.querySelectorAll('.event');

            eventElements.forEach(eventElement => {
                const eventType = Array.from(eventElement.classList)
                    .find(className => className !== 'event');

                const link = eventElement.querySelector('a');
                if (!link) return;

                const href = link.getAttribute('href');

                result.push({
                    date: date,
                    eventType: eventType,
                    href: href.split('/').pop()
                });
            });
        }
    });

    return result;
}

export default {
    Finviz_Export_Screener,
    Futu_Search,
    Futu_Get_News_List,
    Wallstreetcn_Calendar,
    Cboe_Book_Viewer,
    Akamai_Timestamp,
    Spac_Research_Calendar
}



