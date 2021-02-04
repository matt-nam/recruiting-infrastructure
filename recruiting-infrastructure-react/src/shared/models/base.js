import defaultsDeep from "lodash/defaultsDeep";

export class Model {
    defaults() {
        return {};
    }

    constructor(attributes = {}) {
        defaultsDeep(this, attributes, this.defaults());
    }
}

export class List {
    constructor(items = []) {
        this.models = items.map(item => new this.model(item));
    }
}
