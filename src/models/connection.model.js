import UUID from 'uuid/v4';

export default class Connection {

    constructor(from, to) {
        this.id = UUID();
        this.from = from;
        this.to = to;
    }

}
