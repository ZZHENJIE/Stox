<script lang="ts">

import { defineComponent, type PropType } from 'vue';
import { Kimi_Create_QRCode, Kimi_QRCode_Status } from '../../utils/Request';
import { LogoWechat } from '@vicons/ionicons5';

export default defineComponent({
    components: {
        LogoWechat
    },
    props: {
        succeed: {
            type: Function as PropType<(obj: object) => void>,
            required: true,
        }
    },
    data() {
        return {
            id: '',
            is_refresh: true,
        };
    },
    unmounted() {
        this.is_refresh = false;
    },
    methods: {
        create_qrcode() {
            Kimi_Create_QRCode().then(text => {
                const json = JSON.parse(text);
                this.id = json.id;
                this.refresh_status();
            });
        },
        refresh_status() {
            Kimi_QRCode_Status(this.id).then(text => {
                const json = JSON.parse(text);
                switch (json.status) {
                    case 'pending': {
                        if (this.is_refresh) {
                            setTimeout(() => {
                                this.refresh_status();
                            }, 1000);
                        }
                        break;
                    }
                    case 'login': {
                        this.succeed(json);
                        break;
                    }
                    case 'expired': {
                        this.create_qrcode();
                        break;
                    }
                }
            })
        }
    },
    mounted() {
        this.create_qrcode();
    },
});

</script>

<template>
    <n-flex justify="center">
        <n-flex vertical align="center">
            <div class="title-wrapper">
                <n-icon size="28">
                    <LogoWechat />
                </n-icon>
                <p>WeChat Scan To Log In.</p>
            </div>
            <n-qr-code :value="`https://www.kimi.com/wechat/mp/auth?id=${id}`" :size="200" class="qr-code" />
        </n-flex>
    </n-flex>
</template>

<style scoped>
.title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

.qr-code {
    padding: 12px;
    border: 1px solid;
    border-radius: 8px;
}
</style>