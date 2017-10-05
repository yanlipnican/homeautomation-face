<template>
    <span class="wrapper">
        <span v-bind:class="['icon', iconGroup, icon, `size-${size}`, `color-${color}`]"></span>
        <div v-if="badge" v-bind:class="['badge', `color-${badgeColor}`]">{{ badge }}</div>
    </span>
</template>

<script>
export default {
    name: 'icon',
    props: {
        icon: {
            type: String,
        },
        iconGroup: {
            type: String,
            default: 'mdi',
        },
        size: {
            type: String,
            default: 'normal',
        },
        color: {
            type: String,
            default: 'white',
        },
        badge: {
            type: [Number, String],
        },
        badgeColor: {
            type: String,
            default: 'red',
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    .icon {
        &.size {
            &-normal {
                font-size: 24px;
            }
        }
        &.color {
            &-white {
                color: white;
            }
        }
    }
    .badge {
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        font-size: .8rem;
        padding:3px;
        transform: translate(50%);
        border-radius: 50%;
        &.color {
            &-red {
                background-color: red;
                color: white;
            }
            &-yellow {
                background-color: #F1CF54;
                color: white;
            }
        }
    }
}
</style>
