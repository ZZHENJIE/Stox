import { fetch } from "@tauri-apps/plugin-http";
import { type IPOItem } from "./Type";
async function Calendar() {
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

export default {
    Calendar
}