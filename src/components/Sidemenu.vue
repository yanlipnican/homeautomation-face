<template>
    <div class="wrapper">
        <div class="expand-button d-flex justify-content-center align-items-center" @click="expand()" v-bind:class="{show: isClosed}">
            <span class="mdi mdi-menu"></span>
        </div>
        <div class="sidemenu d-flex" v-bind:class="{ closed: isClosed }">
            <div class="content d-flex flex-column justify-content-between">
                <div>
                    <div class="p-3">
                        <div class="d-flex justify-content-between align-items center">
                            <div>
                                <img class="logo" src="../assets/logo.jpg" alt="">
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="colapse-button mdi mdi-arrow-left" @click="toggle()"></span>
                            </div>
                        </div>
                    </div>
                    <ui-menu>
                        <menu-item :active="true" :icon="'mdi-chart-bar'">
                            <template slot="title">dashboard</template>
                        </menu-item>
                        <menu-item :active="false" :submenu="true" :icon="'mdi-account'" @click="test()">
                            <template slot="title">user</template>
                            <menu-item :icon="'mdi-settings'">
                                <template slot="title">settings</template>
                            </menu-item>
                            <menu-item :icon="'mdi-export'">
                                <template slot="title">logout</template>
                            </menu-item>
                        </menu-item>
                        <menu-item :icon="'mdi-help-circle-outline'">
                                <template slot="title">help</template>
                        </menu-item>
                    </ui-menu>
                </div>
                <div class="p-3" style="text-align: center">
                    <hr>
                    <small>
                        Made with <span class="pink mdi mdi-heart"></span> by <span class="pink">@yanlipnican</span>
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from './ui/menu/menu';
import MenuItem from './ui/menu/menu-item';

export default {
    name: 'Sidemenu',
    data() {
        return {
            isClosed: false,
        };
    },
    methods: {
        test() {
            console.log('test');
        },
        expand() {
            this.isClosed = false;
        },
        toggle() {
            this.isClosed = !this.isClosed;
        },
    },
    components: {
        'ui-menu': Menu,
        'menu-item': MenuItem,
    },
};
</script>

<style lang="scss" scoped>
$menu-width: 350px;
.wrapper {
    display: block;
    position: relative;
    min-height: 100%;
}
.pink {
    color: #a33e7e;
}
.expand-button {
    display: block;
    position: absolute;
    margin: 5px 0 0 10px;
    transition: .6s;
    transform: translate(-$menu-width, 0);
    font-size: 24px;
    color: rgba(white, .5);
    cursor: pointer;
    &:hover {
        color: rgba(white, .8);
    }
    &.show {
        transform: translate(0);
    }
}
.sidemenu {
    width: $menu-width;
    display: block;
    background-color: white;
    transition: .4s;
    overflow: hidden;
    position: relative;
    height: 100%;

    .logo {
        width: 60%;
    }

    .colapse-button {
        opacity: .3;
        transition: .3s;
        font-size: 24px;
        cursor: pointer;
        &:hover {
            opacity: 1;
        }
    }

    .content {
        display: block;
        min-width: $menu-width;
        width: $menu-width;
        height: 100%;
        transition: 0;
        position: relative;
    }
    &.closed {
        width: 0;
        .content {
            position: absolute;
        }
    }
}
</style>

