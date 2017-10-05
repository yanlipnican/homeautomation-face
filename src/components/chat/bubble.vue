<template>
    <div class="message-wrapper d-flex flex-row" :class="[{'justify-content-end': user.isUser}]">
        <div class="head" :class="[{'is-user': user.isUser}]"></div>
        <div class="message-bubble" :class="[{'is-user': user.isUser}]">
            <div class="content">
                {{ message.text }}
            </div>
            <div class="time">
                {{ time }}
            </div>
        </div>
    </div>
</template>

<script>
import * as moment from 'moment';

export default {
    props: {
        message: {
            type: Object,
        },
        user: {
            type: Object,
        },
    },
    computed: {
        time() {
            return moment(this.message.time).format('HH:MM');
        },
    },
};
</script>

<style lang="scss" scoped>
.message-wrapper {
    margin-top: 15px;
    position: relative;

    .head {
        width: 30px;
        height: 30px;
        display: block;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        left: 10px;
        &.is-user {
            left: unset;
            right: 10px;
        }
    }

    .message-bubble {

        background-color: white;
        color: rgba(black, .6);
        margin: 0 0 0 50px;
        padding: 15px 20px 10px;
        max-width: 60%;
        .time {
            font-size: .7rem;
            margin-top: 5px;
        }

        &.is-user {
            background-color: #D06E95;
            color: white;
            align-self: flex-end;
            margin: 0 50px 0 0;
        }
    }
}
</style>
