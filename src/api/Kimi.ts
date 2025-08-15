import { fetch } from "@tauri-apps/plugin-http";

async function Create_QRCode() {
    const url = 'https://www.kimi.com/api/user/wx/register_login';
    return fetch(url, { method: 'POST' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}

async function QRCode_Status(id: string) {
    const url = `https://www.kimi.com/api/user/wx/register_login/${id}`;
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}

async function Chat_List(token: string, offset: number = 0, size: number = 5) {
    const url = 'https://www.kimi.com/api/chat/list';
    return fetch(url, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "offset": offset,
            "size": size
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}

async function Chat_Content(chat_id: string, token: string, last: number = 50) {
    const url = `https://www.kimi.com/api/chat/${chat_id}/segment/scroll`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'last': last
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}

async function Create_Chat(token: string, chat_name: string = 'new chat') {
    const url = 'https://www.kimi.com/api/chat';
    return fetch(url, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": chat_name,
            "born_from": "home",
            "kimiplus_id": "kimi",
            "is_example": false,
            "source": "web",
            "tags": []
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}

export default {
    Create_QRCode,
    QRCode_Status,
    Chat_List,
    Chat_Content,
    Create_Chat
}