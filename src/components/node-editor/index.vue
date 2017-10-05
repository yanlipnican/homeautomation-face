<template>
    <div class="node-editor-wrapper" ref="wrapper" :style="{backgroundPosition: `${transform.translate.left}px ${transform.translate.top}px`}">
        <div class="connections-wrapper">
            <svg :width="svgSize.width" :heigth="svgSize.height">
                <g :transform="`translate(${transform.translate.left}, ${transform.translate.top})`">
                    <path v-for="path in paths" :key="path.id" :d="path.curveData"/>
                    <path class="active" :d="newConnectionPath"/>
                </g>
            </svg>
        </div>
        <div class="node-wrapper" ref="nodes">
            <div
                @mousedown="onTransformStart"
                @contextmenu="onContextMenu"
                class="background"
            ></div>
            <node 
                v-for="node in nodes" 
                :key="node.id" 
                :id="node.id"
                :title="node.title" 
                :position="node.position"
                :translate="transform.translate" 
                :inputs="node.slots.input"
                :outputs="node.slots.output"
                :values="node.values"
                :activeSlots="getActiveSlots(node)"
                @move="position => onChangeNode(node, 'position', position)"
                @isMovingChange="moving => isMovingNode = moving"
                @onValue="change => onValueChange(node, change)"
                @remove="() => onRemove(node)"
                @onSlotMousedown="startConnection"                
                @onSlotMouseup="endConnection"   
                @onSlotMouseover="slotMouseover"             
                @onSlotMouseout="slotMouseout"     
                @onContextMenu="onContextMenu"        
            />
        </div>
        <button class="reset-transform btn btn-default" @click="resetTransform">
            Reset transform
        </button>
        <context-menu 
            :expanded="contextMenuExpanded" 
            :position="contextMenuPosition"
            @onClose="onContextMenuClose"
        >
            <context-menu-item>
                Add
            </context-menu-item>
            <context-menu-item>
                Delete
            </context-menu-item>
            <context-menu-item>
                Reset transform
            </context-menu-item>
        </context-menu>
    </div>  
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import Connection from '@/models/connection.model';
import ContextMenu from '@/components/context-menu';
import ContextMenuItem from '@/components/context-menu/item';
import Node from './node';

export default {
    name: 'nodeEditor',
    data() {
        return {
            svgSize: {width: 0, height: 0},
            transform: {
                translate: {top: 100, left: 0},
            },
            paths: [],
            newConnectionPath: '',
            connectionStart: {},
            isMakingConnection: false,
            isMovingNode: false,
            initialTranslation: {top: 0, left: 0},
            initialMousePosition: {top: 0, left: 0},
            isTranslating: false,
            hoveringSlot: {},
            resizeDebouncer: _.debounce(this.setSvgSize, 200),
            contextMenuExpanded: false,
            contextMenuPosition: {top: 0, left: 0},
        };
    },
    props: {
        nodes: Array,
        connections: Array,
        onChange: Function,
    },
    created() {
        $(window).on('mousemove', this.mouseMove);
        $(window).on('resize', this.resizeDebouncer);
        $(window).on('mouseup', this.mouseUp);
    },
    destroyed() {
        $(window).off('mousemove', this.mouseMove);
        $(window).off('resize', this.resizeDebouncer);
        $(window).off('mouseup', this.mouseUp);
        this.resizeDebouncer.cancel();
    },
    mounted() {
        this.setSvgSize();
        this.createConnections();
    },
    watch: {
        nodes() {
            this.createConnections();
        },
        connections() {
            this.createConnections();
        },
    },
    methods: {
        onContextMenuClose() {
            this.contextMenuExpanded = false;
        },
        onContextMenu(e) {
            const wrapper = $(this.$refs.wrapper);
            e.preventDefault();
            this.contextMenuExpanded = true;
            this.contextMenuPosition = {left: e.clientX - wrapper.offset().left, top: e.clientY - wrapper.offset().top};
        },
        resetTransform() {
            this.transform = {
                translate: {left: 0, top: 0},
            };
        },
        onTransformStart(e) {
            if (this.isMakingConnection || this.isMovingNode) {
                return;
            }
            this.isTranslating = true;
            this.initialTranslation = {...this.transform.translate};
            this.initialMousePosition = {left: e.clientX, top: e.clientY};
        },
        slotMouseover(id, key, type) {
            if (this.connectionStart.type !== type) {
                this.hoveringSlot = {id, key};
            }
        },
        slotMouseout(id, key, type) {
            this.hoveringSlot = {};
        },
        startConnection(e, id, key, type) {
            this.connectionStart = {e, id, key, type};
            this.isMakingConnection = true;
        },
        endConnection(e, id, key, type) {
            if (this.connectionStart.type !== type && this.connectionStart.id !== id) {
                const from = type === 'output' ? {id, key} : {
                    id: this.connectionStart.id,
                    key: this.connectionStart.key
                };
                const to = type === 'input' ? {id, key} : {
                    id: this.connectionStart.id,
                    key: this.connectionStart.key
                };
                const connections = _.cloneDeep(this.connections)
                    .filter(item => !(item.to.id === to.id && item.to.key === to.key));
                connections.push(new Connection(from, to));
                this.$emit('onChange', {connections});
            }
            this.isMakingConnection = false;
            this.createNewConnectionPath();
        },
        mouseUp() {
            if (this.isMakingConnection) {
                this.isMakingConnection = false;
                this.createNewConnectionPath();
            }
            this.isTranslating = false;
        },
        mouseMove(e) {
            if (this.isMakingConnection) {
                e.preventDefault();
                this.createNewConnectionPath(e.clientX, e.clientY);
            } else if (this.isTranslating) {
                e.preventDefault();
                this.transform.translate = {
                    top: this.initialTranslation.top + e.clientY - this.initialMousePosition.top,
                    left: this.initialTranslation.left + e.clientX - this.initialMousePosition.left
                };
            }
        },
        getActiveSlots(node) {
            const slots = [];
            // connected slots  
            this.connections.forEach((connection) => {
                if (connection.from.id === node.id) {
                    slots.push(connection.from.key);
                }
                if (connection.to.id === node.id) {
                    slots.push(connection.to.key);
                }
            });
            // current connection start
            if (this.isMakingConnection && this.connectionStart.id === node.id) {
                slots.push(this.connectionStart.key);
            }
            // current connection end
            if (
                this.isMakingConnection &&
                this.hoveringSlot.id === node.id &&
                this.connectionStart.id !== node.id
            ) {
                slots.push(this.hoveringSlot.key);
            }
            return slots;
        },
        setSvgSize() {
            const wrapper = $(this.$refs.wrapper);
            this.svgSize = {
                width: wrapper.width(),
                height: wrapper.height()
            };
        },
        createCurveData(x1, y1, x2, y2) {
            return `M${x1 + 7},${y1 + 7} C${x1 + Math.abs(x1 - x2) / 2},${y1 + 7} ${x2 - Math.abs(x1 - x2) / 2},${y2 + 7} ${x2 + 7},${y2 + 7}`;
        },
        createConnections() {
            const wrapper = $(this.$refs.wrapper);
            const nodes = $(this.$refs.nodes);
            this.paths = this.connections.map((connection) => {
                const from = nodes.find(`.slot[data-id="${connection.from.id}#${connection.from.key}"]`);
                const to = nodes.find(`.slot[data-id="${connection.to.id}#${connection.to.key}"]`);

                const x1 = from.offset().left - wrapper.offset().left - this.transform.translate.left;
                const y1 = from.offset().top - wrapper.offset().top - this.transform.translate.top;

                const x2 = to.offset().left - wrapper.offset().left - this.transform.translate.left;
                const y2 = to.offset().top - wrapper.offset().top - this.transform.translate.top;

                const curveData = this.createCurveData(x1, y1, x2, y2);

                return {
                    id: connection.id,
                    curveData,
                };
            });
        },
        createNewConnectionPath(mouseX, mouseY) {
            if (!this.isMakingConnection) {
                this.newConnectionPath = '';
                return;
            }

            const wrapper = $(this.$refs.wrapper);
            const nodes = $(this.$refs.nodes);
           
            const from = nodes.find(`.slot[data-id="${this.connectionStart.id}#${this.connectionStart.key}"]`);

            const x1 = from.offset().left - wrapper.offset().left - this.transform.translate.left;
            const y1 = from.offset().top - wrapper.offset().top - this.transform.translate.top;

            let x2 = mouseX - wrapper.offset().left - this.transform.translate.left;
            let y2 = mouseY - wrapper.offset().top - this.transform.translate.top;

            if (this.hoveringSlot.id && this.hoveringSlot.id !== this.connectionStart.id) {
                const to = nodes.find(`.slot[data-id="${this.hoveringSlot.id}#${this.hoveringSlot.key}"]`);
                x2 = to.offset().left - wrapper.offset().left - this.transform.translate.left;
                y2 = to.offset().top - wrapper.offset().top - this.transform.translate.top;
            }

            this.newConnectionPath = this.connectionStart.type === 'input' ? 
                this.createCurveData(x2, y2, x1, y1) : this.createCurveData(x1, y1, x2, y2);
        },
        onValueChange(node, change) {
            this.onChangeNode(node, 'values', { ...this.values, ...change });
        },
        onRemove(node) {
            const nodes = _.cloneDeep(this.nodes).filter(item => item.id !== node.id);
            const connections = _.cloneDeep(this.connections)
                .filter(item => item.from.id !== node.id && item.to.id !== node.id);

            this.$emit('onChange', {nodes, connections});
        },
        onChangeNode(node, key, value) {
            const nodes = _.cloneDeep(this.nodes);
            nodes[this.nodes.indexOf(node)][key] = value;
            this.$emit('onChange', {nodes});
        }
    },
    components: {
        Node,
        ContextMenu,
        ContextMenuItem,
    }
};
</script>

<style lang="scss" scoped>
.node-editor-wrapper {
    display: block;
    position: relative;
    background-color: white;
    background-image: url('../../assets/grid-white.jpg');
    overflow: hidden;
}
.node-wrapper, .connections-wrapper, .background {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    position: absolute;
}
.reset-transform {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: steelblue
    }
}
svg {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    path {
        fill: none;
        stroke: lighten(steelblue, 30);
        stroke-width: 5;
        &.active, &:hover {
            stroke: steelblue;
        }
    }
}
</style>
