import { fetch } from "@tauri-apps/plugin-http";

const api_token = '1e3ab083-4d40-48cd-9218-ea042376b56e';

export async function export_screener(parameter) {
    const url = 'https://elite.finviz.com/export.ashx?v=111&' + parameter + '&auth=' + api_token;
    return fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    });
}