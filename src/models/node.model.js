import UUID from 'uuid/v4';

export default class Node {

    constructor(title) {
        this.title = title;
        this.id = UUID();
        this.position = {
            top: 0,
            left: 100,
        };
        this.slots = {
            input: {
                testInput: {},
                testInput2: {},
            },
            output: {
                testOutput: {},
                testOutput2: {},
            },
        };
        this.values = {
            testValue: 0,
        };
    }
    
}
