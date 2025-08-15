import { fetch } from "@tauri-apps/plugin-http";

async function Calendar(start: number, end: number) {
    const url = `https://api-one-wscn.awtmt.com/apiv1/finance/macrodatas?start=${start}&end=${end}`;
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}

export default {
    Calendar
}