import { NFloatButton, NIcon, NTabs } from 'naive-ui';
import { h } from 'vue';
import { defineComponent } from 'vue';
import AboutPane from '../components/Settings/AboutPane';
import GlobalPane from '../components/Settings/GlobalPane';
import FinvizPane from '../components/Settings/FinvizPane';
import TimeWindowPane from '../components/Settings/TimeWindowPane';
import { RefreshCircleSharp, SaveSharp } from '@vicons/ionicons5';
import Config from '../utils/Config';
import { useConfig } from '../plugins/DTBox';

export default defineComponent(() => {

    const save_button = () => h(NFloatButton, {
        bottom: '50px',
        right: '50px',
        onClick: () => Config.Save(useConfig().value)
    }, () => h(NIcon, null, () => h(SaveSharp)));

    const reset_button = () => h(NFloatButton, {
        bottom: '50px',
        right: '100px',
        onClick: () => Config.Save(Config.DEFAULT)
    }, () => h(NIcon, null, () => h(RefreshCircleSharp)));

    const tabs = () => h(NTabs, {
        type: 'segment',
        animated: true,
        defaultValue: 'global',
    }, () => [GlobalPane(), FinvizPane(), TimeWindowPane(), AboutPane()]);

    const render = () => h('div', [tabs(), save_button(), reset_button()])

    return render;
});