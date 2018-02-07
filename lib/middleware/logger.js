"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeLogger = (store) => next => (action) => {
    const { payload, type } = action;
    console.group(action.type);
    console.info('dispatching', { payload, type });
    next(action);
    console.log('next state', store.getState());
    console.groupEnd();
};
