import { type App } from 'vue'
import FutuApi from '../api/Futu'
import { invoke } from '@tauri-apps/api/core'
import { error } from 'naive-ui/es/_utils/naive/warn'

declare module 'vue' {
    interface ComponentCustomProperties {

    }
}

function install(app: App) {

}

function Init() {
    return new Promise((resolve, reject) => {
        FutuApi.Stock_Id_CSV().then(csv => {
            invoke('update_stock_id_csv', { csvText: csv });
            resolve(true);
        }).catch(error => reject(error));
    })
}

export default {
    install,
    Init
}