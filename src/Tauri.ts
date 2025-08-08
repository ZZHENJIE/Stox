import { saveWindowState, restoreStateCurrent, StateFlags } from '@tauri-apps/plugin-window-state';
import { listen } from '@tauri-apps/api/event';

export function initializeTauri() {
    try {
        // 恢复窗口状态
        restoreStateCurrent(StateFlags.ALL);

        // 其他初始化逻辑...
        console.log('Tauri initialized');
    } catch (error) {
        console.error('Tauri initialization failed:', error);
    }
}

export function cleanupBeforeExit() {
    try {
        // 保存窗口状态
        saveWindowState(StateFlags.ALL);

        // 其他清理逻辑...
        console.log('Tauri cleanup completed');
    } catch (error) {
        console.error('Tauri cleanup failed:', error);
    }
}

listen('tauri://window-created', () => {
    initializeTauri();
});

listen('tauri://destroyed', () => {
    cleanupBeforeExit();
});
