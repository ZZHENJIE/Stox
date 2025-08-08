import { fetch } from "@tauri-apps/plugin-http";
import Tool from './Tool';
import { Generate_Token } from '../utils/FutuQuoteToken'

async function Search(symbol: string) {
    const url = `https://www.futunn.com/search-stock/predict?keyword=${symbol}`;
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

async function Stock_News(stock_id: string) {
    const params = {
        stock_id: stock_id,
        market_type: 2,
        type: 0,
        subType: 0,
    };
    const url = Tool.Url_Params_Insert('https://www.futunn.com/quote-api/quote-v2/get-news-list', params);
    const token = Generate_Token(params);
    return fetch(url, {
        method: 'GET',
        headers: {
            'quote-token': token,
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

async function Financial_Calendar(timestamp: number) {
    const date = new Date(timestamp);
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const params = {
        beginDate: dateStr,
        market: 2,
        stockType: 0,
        from: 0,
        count: 20
    };
    const url = Tool.Url_Params_Insert('https://www.futunn.com/quote-api/quote-v2/get-financial-list', params);
    const token = Generate_Token(params);
    return fetch(url, {
        method: 'GET',
        headers: {
            'quote-token': token,
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

async function Flash_News() {
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
        return response.json();
    });
}

export default {
    Search,
    Stock_News,
    Financial_Calendar,
    Flash_News
}