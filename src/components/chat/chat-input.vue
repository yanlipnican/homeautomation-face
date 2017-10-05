<template>
    <div class="chat-input-wrapper d-flex">
        <input placeholder="Type message..." :value="value" @input="handleInput">
        <div class="send d-flex align-items-center justify-content-center" @click="handleSend()">
            <span class="icon mdi mdi-send"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
    methods: {
        handleSend() {
            this.$emit('send', 'value');
        },
        handleInput(e) {
            this.$emit('input', e.target.value);
            this.$emit('change', e.target.value);
        },
    },
};
</script>

<style lang="scss" scoped>
input {
    flex: 1;
    background: white;
    border:none;
    padding: 10px 15px;
    outline: 0;
}
.send {
    background-color: white;
    color: #D06E95;
    padding: 0px 10px;
    font-size: 24px;
    cursor: pointer;
    &, .icon {
       transition: .2s; 
    }
    &:hover .icon {
        transform: translate(3px) rotate(0deg);
    }
}
</style>
