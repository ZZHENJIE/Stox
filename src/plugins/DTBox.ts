import { ref, type App } from 'vue'
import FutuApi from '../api/Futu'
import { invoke } from '@tauri-apps/api/core'
import Config from '../utils/Config';

export function Init() {
    return new Promise((resolve, reject) => {
        FutuApi.Stock_Id_CSV().then(csv => {
            invoke('update_stock_id_csv', { csvText: csv });
            resolve(true);
        }).catch(error => reject(error));
    })
}

declare module 'vue' {
    interface ComponentCustomProperties {

    }
}

const config_ref = ref(Config.Get());
export function useConfig() {
    return config_ref;
}

export default {
    install(app: App) {

    }
}