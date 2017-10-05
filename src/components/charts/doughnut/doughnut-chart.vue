<template>
    <div>
        <div class="circle d-flex justify-content-center align-items-center" v-bind:style="{borderColor: colors[0], borderRightColor: colors[1]}">
            <div class="center">
                <div class="title">{{ title }}</div>
                <div class="value">{{ value }}</div>
            </div>
        </div>
        <div class="p-2 mt-3 d-flex justify-content-center">
            <span v-if="actionTitle" @click="$emit('onAction')" class="action">{{ actionTitle }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'doughnut-chart',
    props: {
        colors: {
            type: Array,
            default: () => ['#54E1FD', '#E3FF2E'],
        },
        title: {
            type: String,
        },
        value: {
            type: String,
        },
        actionTitle: {
            type: String,
        },
        onAction: {
            type: Function,
        },
    },
};
</script>

<style lang="scss" scoped>
.circle {
    border: 8px solid red;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: rotate(-45deg);
    .center {
        color: white;
        text-align: center;
        transform: rotate(45deg);
        .value {
            font-size: 2rem;
            font-weight: bold;
        }
    }
}
.action {
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: .8rem;
    opacity: .6;
    transition: .2s;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
}
</style>
