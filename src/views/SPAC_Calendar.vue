<script lang="js">
import { fetch } from '@tauri-apps/plugin-http';
import { ElButton, ElCalendar } from 'element-plus';
export default {
    data() {
        return {
            data_array: [],
            is_loading: true,
        }
    },
    methods: {
        calendar_data() {
            this.data_array = [];
            fetch('https://www.spacresearch.com/calendar', {
                method: 'GET',
            }).then((response) => {
                response.text().then((htmlString) => {
                    const parser = new DOMParser();
                    const now_date = new Date();
                    const doc = parser.parseFromString(htmlString, 'text/html');

                    // 获取日历容器
                    const calendar = doc.getElementById('calendar');
                    if (!calendar) return [];

                    // 获取所有日期元素
                    const days = calendar.querySelectorAll('.days .day');

                    days.forEach(day => {
                        // 获取日期
                        const dateElement = day.querySelector('.date');
                        if (!dateElement) return;

                        const date = dateElement.textContent.trim();

                        // 获取所有事件元素
                        const eventElements = day.querySelectorAll('.event');

                        eventElements.forEach(eventElement => {
                            // 获取事件类型（排除 'event' 类）
                            const eventType = Array.from(eventElement.classList)
                                .find(className => className !== 'event');

                            // 获取链接
                            const link = eventElement.querySelector('a');
                            if (!link) return;

                            const href = link.getAttribute('href');

                            this.data_array.push({
                                date: date,
                                eventType: eventType,
                                href: href
                            });
                        });
                    });

                    this.is_loading = false;

                })

            });

        },
        get_data(date) {
            const list = [];
            if (this.data_array.length != 0) {

                const day = new Date(date).getDay().toString();


                while (true) {
                    if (this.data_array[0].date === day) {
                        list.push({
                            eventType: this.data_array[0].eventType,
                            symbol: this.data_array[0].symbol
                        })
                        list.shift();
                    } else {
                        break;
                    }
                }

            }

            return list.toString();
        }
    }
}
</script>


<template>
    <ElButton @click="calendar_data()" />
    <ElButton @click="console.log(this.data_array)" />
    <ElCalendar v-loading="is_loading">
        <template #date-cell="{ data }">
            <p>{{ this.get_data(data.day) }}</p>
        </template>
    </ElCalendar>
</template>