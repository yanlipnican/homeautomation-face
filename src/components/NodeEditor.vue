<template>
    <div class="d-flex align-items-stretch node-editor">
        <side-menu style="z-index: 2; position: relative"/>
        <node-editor class="flex-1" :nodes="nodes" :connections="connections" @onChange="onChange"/>
    </div>
</template>

<script>
import NodeEditor from '@/components/node-editor';
import Node from '@/models/node.model';
import Connection from '@/models/connection.model';
import SideMenu from '@/components/Sidemenu';

export default {
    data() {
        const nodes = [
            new Node('Hello'),
            new Node('Hello2'),
            new Node('Hello3'),
        ];

        return {
            nodes,
            connections: [
    // new Connection({id: nodes[0].id, key: 'testOutput'}, {id: nodes[1].id, key: 'testInput'}),
    // new Connection({id: nodes[0].id, key: 'testOutput2'}, {id: nodes[1].id, key: 'testInput2'}),
    // new Connection({id: nodes[1].id, key: 'testOutput2'}, {id: nodes[2].id, key: 'testInput'}),
            ],
        };
    },
    methods: {
        onChange({nodes, connections}) {
            this.nodes = nodes || this.nodes;
            this.connections = connections || this.connections;
        }
    },
    components: {
        NodeEditor,
        SideMenu,
    }
};
</script>

<style lang="scss" scoped>
.node-editor {
    height: 100vh;
}
.flex-1 {
    flex: 1;
}
</style>
