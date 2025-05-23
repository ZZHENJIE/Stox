<script lang="js">
import { fetch } from '@tauri-apps/plugin-http';
import { ElButton, ElCalendar } from 'element-plus';
export default {
    data() {
        return {
            data_array: []
        }
    },
    methods: {
        calendar_data() {
            this.calendar_data = [];
            fetch('https://www.spacresearch.com/calendar', {
                method: 'GET',
            }).then((response) => {
                response.text().then((htmlString) => {
                    const parser = new DOMParser();
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

                            this.calendar_data.push({
                                date: date,
                                eventType: eventType,
                                href: href
                            });
                        });
                    });

                })

            });

        },
    }
}
</script>


<template>
    <ElButton @click="calendar_data()" />
    <ElButton @click="console.log(this.calendar_data)" />
    <ElCalendar>
        <template #date-cell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                {{ data.isSelected ? '✔️' : '' }}
            </p>

            <button @click="console.log(data)"></button>
        </template>
    </ElCalendar>
</template>