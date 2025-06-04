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