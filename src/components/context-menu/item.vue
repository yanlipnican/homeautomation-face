<template>
    <div :class="['context-menu-item', {disabled}]">
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        disabled: Boolean,
    }
};
</script>

<style lang="scss" scoped>
    .context-menu-item {
        color: lighten(black, 40);
        padding: 8px 30px;
        background-color: darken(white, 2);
        cursor: pointer;
        &:hover {
            background-color: lighten(steelblue, 20);
            color: white;
        }
        &.disabled {
            background-color: darken(white, 5);
            color: lighten(black, 60);
        }
    }
</style>
