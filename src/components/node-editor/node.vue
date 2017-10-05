<template>
    <div 
        class="node" 
        :style="{left: _position.left + translate.left + 'px', top: _position.top + translate.top + 'px'}"
        ref="node"
    >
        <div 
            class="title d-flex justify-content-between align-items-center"
            @mousedown="onStartMove"
            @contextmenu="e => $emit('onContextMenu', e)"
        >
            <span>{{ title }}</span>
        </div>
        <div class="content">
            <div class="outputs">
                <div 
                    v-for="(value, key) in outputs" 
                    :key="key" 
                    class="io"
                    @mousedown="e => $emit('onSlotMousedown', e, id, key, 'output')"
                    @mouseup="e => $emit('onSlotMouseup', e, id, key, 'output')"
                    @mouseover="$emit('onSlotMouseover', id, key, 'output')"
                    @mouseout="$emit('onSlotMouseout', id, key, 'output')"
                >
                    <span>{{ key }}</span>
                    <div 
                        :data-id="id + '#' + key" 
                        :class="['slot', {active: activeSlots.includes(key)}]"
                    >
                    </div>
                </div>
            </div>
            <div v-for="(value, key) in values" :key="key" class="input">
                <label>{{key}}</label>
                <input type="text" :value="value" @keyup="e => onValueChange(key, e.target.value)">
            </div>
            <div class="inputs">
                <div 
                    v-for="(value, key) in inputs"
                    :key="key"
                    class="io"
                    @mousedown="e => $emit('onSlotMousedown', e, id, key, 'input')"
                    @mouseup="e=> $emit('onSlotMouseup', e, id, key, 'input')"
                    @mouseover="$emit('onSlotMouseover', id, key, 'input')"
                    @mouseout="$emit('onSlotMouseout', id, key, 'input')"
                >
                    <div 
                        :data-id="id + '#' + key" 
                        :class="['slot', {active: activeSlots.includes(key)}]"
                    >
                    </div>
                    <span>{{ key }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    name: 'Node',
    props: {
        id: String,
        title: String,
        position: Object,
        translate: Object,
        activeSlots: {
            type: Array,
            default: () => [],
        },
        inputs: Object,
        outputs: Object,
        values: Object,
        move: Function,
        remove: Function,
        onSlotMousedown: Function,
        onSlotMouseup: Function,
        onSlotMouseover: Function,
        onSlotMouseout: Function,
        onContextMenu: Function,
    },
    data() {
        return {
            isMoving: false,
            initialPosition: {
                top: 0,
                left: 0,
            },
            initialMousePosition: {
                top: 0,
                left: 0,
            },
            movingPosition: {
                top: 0,
                left: 0,
            },
        };
    },
    methods: {
        onValueChange(key, value) {
            const obj = {};
            obj[key] = value;
            this.$emit('onValue', obj);
        },
        onStartMove(e) {
            this.$emit('isMovingChange', true);
            const node = $(this.$refs.node);
            this.isMoving = true;
            this.initialMousePosition = {
                top: e.clientY,
                left: e.clientX,
            };
            this.initialPosition = {
                top: node.position().top,
                left: node.position().left,
            };
            this.calculateMovingPosition(e.clientX, e.clientY);
        },
        onStopMove(e) {
            if (!this.isMoving) {
                return;
            }
            this.$emit('isMovingChange', false);
            e.preventDefault();
            this.isMoving = false;
        },
        onMove(e) {
            if (!this.isMoving) {
                return;
            }
            e.preventDefault();
            this.$emit('move', this.movingPosition);
            this.calculateMovingPosition(e.clientX, e.clientY);
        },
        calculateMovingPosition(mouseX, mouseY) {
            this.movingPosition = {
                top: this.initialPosition.top + mouseY - this.initialMousePosition.top - this.translate.top, 
                left: this.initialPosition.left + mouseX - this.initialMousePosition.left - this.translate.left, 
            };
        }
    },
    computed: {
        _position() {
            return this.isMoving ? this.movingPosition : this.position;
        },
    },
    created() {
        $(window).on('mouseup', this.onStopMove);
        $(window).on('mousemove', this.onMove);
    },
    destroyed() {
        $(window).off('mouseup', this.onStopMove);
        $(window).off('mousemove', this.onMove);
    },
};
</script>

<style lang="scss" scoped>

$slot-size: 14px;

.node {
    background-color: white;
    border: 1px solid lighten(black, 80);
    width: 200px;
    color: black;
    position: absolute;
    padding-bottom: $slot-size;
    border-radius: 6px;
    color: #666;
}
.title {
    cursor: pointer;
    background-color: rgba(steelblue, .5);
    color: white;
    padding: 3px $slot-size;
    font-weight: bold;
    border-radius: 6px 6px 0 0;
    transition: .3s;
    &:hover {
        background-color: rgba(steelblue, .8);
    }
}
.slot {
    width: $slot-size;
    max-width: $slot-size;
    max-height: $slot-size;
    height: $slot-size;
    background-color: white;
    border:2px solid lighten(black, 70);
    border-radius: 50%;
    cursor: pointer;
    &:hover, &.active {
        border: 5px solid steelblue;
    }
}
.inputs, .outputs {
    .io {
        display: flex;
        align-items: center;
        .slot {
            position: relative;
            left: $slot-size / 2 * -1;
        }
    }
}
.outputs .io {
    justify-content: flex-end;
    .slot {
        left: $slot-size / 2;
    }
}
.io, .input {
    margin-top: 10px;
}
.input {
    display: flex;
    align-items: center;
    padding: 0 $slot-size;
    input {
        flex: 1;
        width: 100%;
        margin-left: 10px;
        background: none;
        border: none;
        background-color: lighten(black, 90);
        padding: 2px 10px;
        border-radius: 6px;
    }
    label {
        margin: 0;
    }
}
</style>
