<template>
    <div class="menu-item" v-bind:class="[{active}]">
        <div class="title d-flex justify-content-between" @click="onClick()">
            <div class="d-flex align-items-center">
                <span v-if="icon" class="icon" v-bind:class="['mdi', icon]"></span>
                <slot name="title"></slot>
            </div>
            <div class="d-flex align-items-center">
                <span v-if="submenu" class="mdi" v-bind:class="[expanded ? 'mdi-chevron-up' : 'mdi-chevron-down']"></span>
            </div>
        </div>
        <div v-if="submenu" class="sub-menu" v-bind:class="{expanded: expanded}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menu-item',
    props: {
        icon: {
            type: String,
        },
        submenu: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
        click: {
            type: Function,
        },
    },
    data() {
        return {
            expanded: true,
        };
    },
    methods: {
        onClick() {
            this.$emit('click');
            if (this.submenu) {
                this.toggle();
            }
        },
        toggle() {
            this.expanded = !this.expanded;
        },
    },
};
</script>

<style lang="scss">
.menu-item {
    cursor: pointer;
    .sub-menu {
        overflow: hidden;
        display: none;
        position: relative;
        &.expanded {
            display: block;
        }
    }
}
</style>
