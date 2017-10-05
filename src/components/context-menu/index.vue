<template>
    <div ref="wrapper" v-show="expanded" class="context-menu" :style="{top: position.top + 'px', left: position.left + 'px'}">
        <slot/>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    props: {
        expanded: {
            type: Boolean,
            default: false,
        },
        position: {
            type: Object,
            default: () => ({top: 0, left: 0}),
        },
        onClose: Function,
    },
    methods: {
        handleClickOutside(e) {
            if (e.target === this.$refs.wrapper || $.contains(this.$refs.wrapper, e.target)) {
                return;
            }
            this.$emit('onClose');
        },
    },
    created() {
        $(window).on('mousedown', this.handleClickOutside);
    },
    destroyed() {
        $(window).off('mousedown', this.handleClickOutside);        
    },
};
</script>

<style lang="scss" scoped>
    .context-menu {
        position: absolute;
        display: block;
        min-width: 200px;
        border: 1px solid lighten(black, 80);
        background-color: darken(white, 10);
    }
</style>
