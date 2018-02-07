"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
exports.default = compose;
;
