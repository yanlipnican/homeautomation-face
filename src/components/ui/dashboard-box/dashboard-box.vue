<template>
    <div class="dashboard-box d-flex flex-column">
        <div class="d-flex justify-content-between head">
            <div class="d-flex align-items-center">
                <span class="title">{{ title }}</span>
            </div>
            <div class="d-flex align-items-center">
                <span class="drop mdi mdi-dots-vertical"></span>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dashboard-box',
    props: {
        title: {
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
    .dashboard-box {
        background-color: rgba(white, .1);
        box-shadow: 0 0 10px rgba(black, .1);
        width: 100%;
        height: 100%;
        .head {
            padding: 10px 20px;
            color: white;
        }
        .title {
            font-size: 1.1rem;
        }
        .drop {
            font-size: 24px;
            cursor: pointer;
        }
        .content {
            flex: 1;
        }
    }
</style>
