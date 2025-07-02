import { fetch } from "@tauri-apps/plugin-http";
import { Futu_Get_API_Token } from './Miscellaneous';

export interface FinvizScreenerItem {
    Ticker: string,
    Company: string,
    Sector: string,
    Industry: string,
    Country: string,
    MarketCap: string,
    PriceEarningsRatio: string,
    Price: string,
    Change: string,
    Volume: string,
}

export async function Finviz_Export_Screener(parameter: string, token: string) {
    const url = `https://elite.finviz.com/export.ashx?v=111&${parameter}&auth=${token}`;
    return fetch(url, {
        method: 'GET'
    }).then(async response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const CSV = await response.text();
        const Lines = CSV.split('\n');
        const Result: FinvizScreenerItem[] = [];
        for (let line = 1; line < Lines.length - 2; line++) {
            const items = Lines[line].split(',');
            Result.push({
                Ticker: items[1].replace(/"/g, ''),
                Company: items[2].replace(/"/g, ''),
                Sector: items[3].replace(/"/g, ''),
                Industry: items[4].replace(/"/g, ''),
                Country: items[5].replace(/"/g, ''),
                MarketCap: items[6].replace(/"/g, ''),
                PriceEarningsRatio: items[7].replace(/"/g, ''),
                Price: items[8].replace(/"/g, ''),
                Change: items[9].replace(/"/g, ''),
                Volume: items[10].replace(/"/g, '')
            })
        }
        return Result;
    });
}

export async function Futu_Search(symbol: string) {
    const url = `https://www.futunn.com/search-stock/predict?keyword=${symbol}`;
    return fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    });
}

export async function Futu_Get_News_List(stock_id: string) {
    const params = {
        stock_id: stock_id,
        market_type: 2,
        type: 0,
        subType: 0,
    };
    const url = `https://www.futunn.com/quote-api/quote-v2/get-news-list?stock_id=${stock_id}&market_type=2&type=0&subType=0`;
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

export async function Wallstreetcn_Calendar(start: number, end: number) {
    const url = `https://api-one-wscn.awtmt.com/apiv1/finance/macrodatas?start=${start}&end=${end}`;
    return fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
}

export async function Cboe_Book_Viewer(symbol: string, market: string) {
    const url = `https://www.cboe.com/json/${market}/book/${symbol}`;
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

export interface SPACItem {
    date: string | undefined,
    eventType: string | undefined,
    href: string | undefined
}

export async function Spac_Research_Calendar() {
    const url = 'https://www.spacresearch.com/calendar';
    const response = await fetch(url, {
        method: 'GET'
    });
    const html = await response.text();
    const parser = new DOMParser();
    const result: SPACItem[] = [];
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

            const date = dateElement.textContent?.trim();

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
                    href: href?.split('/').pop()
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



