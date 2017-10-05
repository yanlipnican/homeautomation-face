<template>
    <div :style="{width, height}">
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'chart',
    data() {
        return {
            chart: null,
        };
    },
    props: {
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '300px',
        },
        type: {
            type: String,
        },
        data: {
            type: [Object, Array],
            default: () => {},
        },
        options: {
            type: Object,
            default: () => {},
        },
    },
    mounted() {
        this.chart = new Chart(this.$refs.chart, {
            type: this.type,
            data: this.data,
            options: {
                ...this.options,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        format: 'timeFormat'
                    }
                }]
                }
            },
        });
    },
    updated() {
        this.chart.data = this.data;
        this.chart.update();
    },
};
</script>

<style lang="scss" scoped>

</style>

