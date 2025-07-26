import { saveWindowState, restoreStateCurrent, StateFlags } from '@tauri-apps/plugin-window-state';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';

export async function initializeTauri() {
    try {
        // 恢复窗口状态
        await restoreStateCurrent(StateFlags.ALL);

        // 其他初始化逻辑...
        console.log('Tauri initialized');
    } catch (error) {
        console.error('Tauri initialization failed:', error);
    }
}

export async function cleanupBeforeExit() {
    try {
        // 保存窗口状态
        await saveWindowState(StateFlags.ALL);

        // 其他清理逻辑...
        console.log('Tauri cleanup completed');
    } catch (error) {
        console.error('Tauri cleanup failed:', error);
    }
}

export async function listenEvent() {
    invoke('set_complete', { finish: true });

    listen('tauri://window-created', async () => {
        await initializeTauri();
    });

    listen('tauri://destroyed', async () => {
        await cleanupBeforeExit();
    });
}

export default {
    listenEvent
}