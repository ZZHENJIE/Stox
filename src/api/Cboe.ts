import { fetch } from "@tauri-apps/plugin-http";

async function Book_Viewer(symbol: string, market: string) {
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
        return response.json();
    })
}

export default {
    Book_Viewer
}