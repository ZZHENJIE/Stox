// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{AppHandle,Manager};
use tauri::App;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn set_complete(
    app: AppHandle,
    finish: bool,
) -> Result<(), ()> {
    if finish == true {
        if let Some(splash_window) = app.get_webview_window("splashscreen") {
            let main_window = app.get_webview_window("main").unwrap();
            splash_window.close().unwrap();
            main_window.show().unwrap();
        }
    }
    Ok(())
}

fn init_setup(app:&mut App){
    let main_window = app.get_webview_window("main").unwrap();
    main_window.hide().unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .invoke_handler(tauri::generate_handler![set_complete,greet])
        .setup(|app| {
            init_setup(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
