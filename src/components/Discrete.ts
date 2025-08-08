
import { createDiscreteApi, darkTheme, lightTheme, type ModalOptions } from "naive-ui";
import type { AppConfig } from "../utils/ConfigType";
function Modal(config: AppConfig, options?: ModalOptions) {
    const merged_options: ModalOptions = {
        preset: 'card',
        style: {
            width: '800px',
            height: '600px',
        },
        ...options
    };

    const DiscreteApi = createDiscreteApi(['modal'], {
        configProviderProps: {
            theme: config.is_dark_theme ? darkTheme : lightTheme
        }
    });

    return DiscreteApi.modal.create(merged_options);
}

export default {
    Modal
}

