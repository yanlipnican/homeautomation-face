<template>
    <div class="chat-box d-flex flex-column">
        <div class="messages-wrapper" :style="{height}">
            <div class="messages d-flex flex-column justify-content-end">
                <bubble v-for="message in messages" :key="message.id" :message="message" :user="people.filter(user => user.id === message.user)[0]"/>
            </div>
        </div>
        <chat-input v-model="inputValue" @send="send"/>
    </div>
</template>

<script>
import Input from './chat-input';
import Bubble from './bubble';

export default {
    data() {
        return {
            inputValue: '',
        };
    },
    props: {
        height: {
            type: String,
            default: '400px',
        },
        messages: {
            type: Array,
            default: () => [],
        },
        people: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        send(value) {
            console.log(value);
            this.inputValue = '';
        },
    },
    components: {
        'chat-input': Input,
        Bubble,
    },
};
</script>

<style lang="scss" scoped>
.chat-box {
    .messages-wrapper{
        overflow-y: scroll;
        display: block;
        position: relative;
    }
    .messages {
        padding-bottom: 15px;
    }
}
</style>
