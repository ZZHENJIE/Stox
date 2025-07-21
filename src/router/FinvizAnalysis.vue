<script lang="ts">
import { PlayCircle } from '@vicons/ionicons5';
import { Finviz_Candlestick, Finviz_Export_Screener, type FinvizScreenerItem } from '../utils/Request';
import ScreenerCharts from '../components/Finviz/ScreenerCharts.vue';

export default {
    components: { PlayCircle, ScreenerCharts },
    data() {
        return {
            list_count: 0,
            count: 0,
            result: [] as FinvizScreenerItem[],
            is_run: false,
            activeRequests: new Set<Promise<any>>(), // 存储所有活跃请求的Promise
            activeTimers: [] as number[],            // 存储所有重试定时器
        };
    },
    methods: {
        is_conform(obj: any): boolean {
            // 1. 检查数据有效性
            if (!obj.close || obj.close.length < 5) return false;

            // 2. 分析最近5天的价格行为
            let isStable = true;
            let closeNearHighCount = 0;
            let smallSpreadCount = 0;
            let volumeStable = true;
            const volumeThreshold = 0.3; // 成交量波动阈值30%

            for (let i = Math.max(0, obj.close.length - 5); i < obj.close.length; i++) {
                // 2.1 检查当日价格区间
                const spread = obj.high[i] - obj.low[i];
                const spreadRatio = spread / obj.close[i];

                // 特征1：价格波动小（日内振幅<1.5%）
                if (spreadRatio > 0.015) {
                    isStable = false;
                }

                // 特征2：收盘价接近最高价（差距<0.5%）
                const closeToHigh = (obj.high[i] - obj.close[i]) / obj.close[i];
                if (closeToHigh < 0.005) {
                    closeNearHighCount++;
                }

                // 特征3：小实体K线（实体部分<0.8%）
                const bodySize = Math.abs(obj.close[i] - obj.open[i]) / obj.close[i];
                if (bodySize < 0.008) {
                    smallSpreadCount++;
                }
            }

            // 3. 检查成交量稳定性（最近5天波动<30%）
            if (obj.volume && obj.volume.length >= 5) {
                const recentVolumes = obj.volume.slice(-5);
                const avgVolume = recentVolumes.reduce((a: number, b: number) => a + b, 0) / 5;
                for (const vol of recentVolumes) {
                    if (Math.abs(vol - avgVolume) / avgVolume > volumeThreshold) {
                        volumeStable = false;
                        break;
                    }
                }
            }

            // 4. 综合判断（满足至少3个特征）
            return (
                (isStable || closeNearHighCount >= 3) &&
                smallSpreadCount >= 3 &&
                volumeStable
            );
        },

        // 封装 Finviz_Export_Screener，支持取消
        cancellableExportScreener(params: string, token: string): Promise<any> {
            const promise = Finviz_Export_Screener(params, token);
            this.activeRequests.add(promise);
            promise.finally(() => this.activeRequests.delete(promise));
            return promise;
        },

        // 封装 Finviz_Candlestick，支持取消
        cancellableCandlestick(params: any): Promise<any> {
            const promise = Finviz_Candlestick(params);
            this.activeRequests.add(promise);
            promise.finally(() => this.activeRequests.delete(promise));
            return promise;
        },

        start() {
            if (this.is_run) {
                this.$DiscreteApi().message.warning('Task is running, please not click...');
                return;
            }

            this.is_run = true;
            this.count = 0;
            this.result = [];

            const MAX_CONCURRENT = 6;
            const RETRY_DELAY = 4000;
            let activeCount = 0;
            let pendingQueue: FinvizScreenerItem[] = [];

            this.cancellableExportScreener('&f=sh_price_0.7to20,sh_curvol_o200&o=-volume', this.$Config().finviz.token)
                .then(list => {
                    this.list_count = list.length;
                    pendingQueue = [...list];

                    const processQueue = () => {
                        while (pendingQueue.length > 0 && activeCount < MAX_CONCURRENT) {
                            const item = pendingQueue.shift()!;
                            activeCount++;

                            const processItem = (retryCount = 0) => {
                                this.cancellableCandlestick({
                                    ticker: item.Ticker,
                                    barsCount: 5,
                                    timeframe: 'd',
                                    instrument: 'stock'
                                })
                                    .then(text => {
                                        const json = JSON.parse(text);
                                        if (this.is_conform(json)) this.result.push(item);
                                        this.count++;
                                        activeCount--;
                                        processQueue();
                                    })
                                    .catch(error => {
                                        activeCount--;
                                        if (error.name === 'AbortError') {
                                            console.log(`请求 ${item.Ticker} 已取消`);
                                            return;
                                        }
                                        console.error(`请求 ${item.Ticker} 失败:`, error);
                                        if (retryCount < 3) {
                                            const timer = setTimeout(() => {
                                                activeCount++;
                                                processItem(retryCount + 1);
                                            }, RETRY_DELAY);
                                            this.activeTimers.push(timer); // 存储定时器
                                        } else {
                                            this.count++;
                                            console.warn(`请求 ${item.Ticker} 重试3次后仍失败`);
                                        }
                                        processQueue();
                                    });
                            };
                            processItem();
                        }
                    };
                    processQueue();
                })
                .catch(error => {
                    if (!this.is_run) return; // 如果已手动取消，不显示错误
                    console.error('获取筛选器列表失败:', error);
                    this.$DiscreteApi().message.error('获取初始数据失败！');
                    this.is_run = false;
                });
        },

        cancelRequests() {
            this.is_run = false;
            // 取消所有活跃请求（通过标记而非实际中止）
            this.activeRequests.clear();
            // 清除所有重试定时器
            this.activeTimers.forEach(timer => clearTimeout(timer));
            this.activeTimers = [];
        }
    },
    beforeUnmount() {
        this.cancelRequests(); // 组件卸载时取消所有请求
    }
};
</script>

<template>
    <NFlex v-show="list_count != 0" vertical>
        <n-progress type="line" indicator-placement="inside" processing
            :percentage="Number(((count / list_count) * 100).toFixed(2))" />
        <ScreenerCharts :model-value="result"></ScreenerCharts>
    </NFlex>
    <n-float-button @click="start" :right="50" :bottom="50">
        <n-icon>
            <PlayCircle />
        </n-icon>
    </n-float-button>
</template>