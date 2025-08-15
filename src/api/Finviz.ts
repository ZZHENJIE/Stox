import { fetch } from "@tauri-apps/plugin-http";
import Tool from "../utils/Tool";
import { type FinvizScreenerItem, type FinvizCandlestickParams } from './Type'
async function Export_Screener(parameter: string, token: string) {
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
                Symbol: items[1].replace(/"/g, ''),
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

async function Candlestick(params: FinvizCandlestickParams) {
    const url = Tool.Url_Params_Insert('https://api.finviz.com/api/quote.ashx', params);
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}

export default {
    Export_Screener,
    Candlestick,
}