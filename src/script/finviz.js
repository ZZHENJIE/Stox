import { fetch } from "@tauri-apps/plugin-http";

const api_token = '1e3ab083-4d40-48cd-9218-ea042376b56e';

export function export_screener(parameter) {
    const url = 'https://elite.finviz.com/export.ashx?v=111&' + parameter + '&auth=' + api_token;
    console.log(url);

    return fetch(url, {
        method: 'GET'
    })
}

export default {
    export_screener,
}