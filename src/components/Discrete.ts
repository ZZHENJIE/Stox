
import { createDiscreteApi, darkTheme, lightTheme, type ModalOptions } from "naive-ui";
import Config from "../utils/Config";
function Modal(options?: ModalOptions) {
    const config = Config.Get();

    const DiscreteApi = createDiscreteApi(['modal'], {
        configProviderProps: {
            theme: config.is_dark_theme ? darkTheme : lightTheme
        }
    });

    const merged_options: ModalOptions = {
        preset: 'card',
        style: {
            width: '800px',
            height: '600px',
        },
        ...options
    };

    return DiscreteApi.modal.create(merged_options);
}

function LoadingBar() {
    const DiscreteApi = createDiscreteApi(['loadingBar']);
    return DiscreteApi.loadingBar;
}

function Notification() {
    const config = Config.Get();

    const DiscreteApi = createDiscreteApi(['notification'], {
        configProviderProps: {
            theme: config.is_dark_theme ? darkTheme : lightTheme
        }
    });
    return DiscreteApi.notification;
}

export default {
    Modal,
    LoadingBar,
    Notification
}

