"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
function createStoreConnector(storeName) {
    return (component) => mobx_react_1.inject(storeName)(mobx_react_1.observer(component));
}
exports.createStoreConnector = createStoreConnector;
