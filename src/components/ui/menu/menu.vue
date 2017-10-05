<template>
    <div class="menu-wrapper" v-bind:class="[`type-${type}`]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ui-menu',
    props: {
        type: {
            default: 'sidemenu',
            type: String,
        },
    },
};
</script>

<style lang="scss">
.menu-wrapper {
    padding: none !important;

    &.type {
        &-sidemenu {
            .menu-item {
                .icon {
                    margin-right: 20px;
                    font-size: 24px;
                    position: relative;
                }
                .title {
                    width: 100%;
                    padding: 20px 30px;
                    text-align: left;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    transition: .1s;
                }
                .sub-menu {
                    background-color: rgba(gray, .1);
                }
                .sub-menu .title {
                    padding: 15px 30px 15px 50px;
                    font-size: .9rem;
                    .icon {
                        font-size: 20px;
                    }
                }
                &.active > .title {
                    background-color: rgba(#94429C, .6);
                    color: white;
                }
                .title:hover {
                    background-color: #94429C;
                    color: white;
                }
            }
        }
    }
}
</style>
