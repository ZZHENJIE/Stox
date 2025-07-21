<script lang="ts">
import FinancialCalendar from '../components/Futu/FinancialCalendar.vue';
import FlashNews from '../components/Futu/FlashNews.vue';

export default {
    components: {
        FinancialCalendar,
        FlashNews
    }
}

</script>

<template>
    <div class="_home_container">
        <div class="_home_FinancialCalendar">
            <n-scrollbar>
                <FinancialCalendar></FinancialCalendar>
            </n-scrollbar>
        </div>
        <div class="_home_FlashNews">
            <n-scrollbar>
                <FlashNews></FlashNews>
            </n-scrollbar>
        </div>
    </div>
</template>

<style lang="css">
._home_container {
    display: grid;
    grid-template-columns: 1.1fr 1.1fr 0.9fr;
    grid-template-rows: 1.1fr 1.1fr 1.1fr;
    gap: 0px 0px;
    height: 98vh;
    grid-template-areas:
        "_home_FlashNews _home_FlashNews _home_FinancialCalendar"
        "_home_FlashNews _home_FlashNews _home_FinancialCalendar"
        "_home_FlashNews _home_FlashNews _home_FinancialCalendar";
}

._home_FinancialCalendar {
    padding-left: 5px;
    grid-area: _home_FinancialCalendar;
}

._home_FlashNews {
    grid-area: _home_FlashNews;
}
</style>