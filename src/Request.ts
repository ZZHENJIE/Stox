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
    const VolumeFormat = (volume: number): string => {
        if (volume >= 1000000) {
            return (volume / 1000000).toFixed(2) + 'M';
        } else if (volume >= 1000) {
            return (volume / 1000).toFixed(2) + 'K';
        } else {
            return volume.toString();
        }
    };
    const url = `https://elite.finviz.com/export.ashx?v=111&${parameter}&auth=${token}`;
    return fetch(url, { method: 'GET' }).then(async response => {
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
                Volume: VolumeFormat(parseInt(items[10]))
            })
        }
        return Result;
    });
}

export function Url_Params_Insert(url: string, params: object) {
    const Url = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
        Url.searchParams.set(key, value);
    });
    return Url;
}

interface Finviz_Candlestick_Params {
    aftermarket?: boolean,
    barsCount: number,
    instrument: 'stock',
    premarket?: boolean,
    ticker: string,
    timeframe: 'd' | 'i1',
}

export async function Finviz_Candlestick(params: Finviz_Candlestick_Params) {
    const url = Url_Params_Insert('https://api.finviz.com/api/quote.ashx', params);
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
}

export async function Futu_Search(symbol: string) {
    const url = `https://www.futunn.com/search-stock/predict?keyword=${symbol}`;
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    });
}

export async function Futu_Stock_News(stock_id: string) {
    const params = {
        stock_id: stock_id,
        market_type: 2,
        type: 0,
        subType: 0,
    };
    const url = Url_Params_Insert('https://www.futunn.com/quote-api/quote-v2/get-news-list', params);
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

export async function Futu_Financial_Calendar(timestamp: number) {
    const date = new Date(timestamp);
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const params = {
        beginDate: dateStr,
        market: 2,
        stockType: 0,
        from: 0,
        count: 20
    };
    const url = Url_Params_Insert('https://www.futunn.com/quote-api/quote-v2/get-financial-list', params);
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

export async function Futu_Flash_News() {
    const url = 'https://news.futunn.com/news-site-api/main/get-flash-list?pageSize=30';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Cookie': 'locale=zh-cn;'
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
    return fetch(url, { method: 'GET' }).then(response => {
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
    return fetch(url, { method: 'GET' }).then(response => {
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
    const response = await fetch(url, { method: 'GET' });
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

export interface IPOItem {
    Company: string,
    Symbol: string,
    Managers: string,
    Shares_Millions: string,
    Price_Low: string,
    Price_High: string,
    Estimated_Dollar_Volume: string,
    Expected_Date: string,
};

export async function Iposcoop_Calendar() {
    const url = 'https://www.iposcoop.com/ipo-calendar/';
    const response = await fetch(url, { method: 'GET' });
    const html = await response.text();
    const parser = new DOMParser();
    const result: IPOItem[] = [];
    const doc = parser.parseFromString(html, 'text/html');
    const tbody = doc.querySelector("tbody");

    if (!tbody) {
        return result;
    }

    const trElements = tbody.querySelectorAll("tr");

    trElements.forEach((tr) => {
        const tds = tr.querySelectorAll("td");
        const item: IPOItem = {
            Company: tds[0].textContent?.trim() || "", // 公司名称
            Symbol: tds[1].textContent?.trim() || "", // 股票代码
            Managers: tds[2].textContent?.trim() || "", // 承销商
            Shares_Millions: tds[3].textContent?.trim() || "", // 发行股数（百万）
            Price_Low: tds[4].textContent?.trim() || "", // 最低发行价
            Price_High: tds[5].textContent?.trim() || "", // 最高发行价
            Estimated_Dollar_Volume: tds[6].textContent?.trim() || "", // 预计募资额
            Expected_Date: tds[7].textContent?.trim() || "", // 预计日期
        };
        result.push(item);
    });

    return result;
}



