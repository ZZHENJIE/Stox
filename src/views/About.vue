<script lang="tsx">
import { getCurrentInstance } from 'vue';


export default {
    setup() {
        const properties = getCurrentInstance()?.appContext.config.globalProperties;

        const render = () => {
        };
        return render
    }
}

</script>