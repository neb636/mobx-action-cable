"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const compose_1 = require("./compose");
const _ = require("lodash");
mobx_1.useStrict(true);
class Store {
    constructor(state, dispatch) {
        this.state = state;
        this.dispatch = dispatch;
        this.registeredActions = [];
    }
    connectActions(actions) {
        return _.mapValues(actions, (action, name) => this.wrapAction(action, name));
    }
    checkActionRegistered(registeredActions, actionName) {
        if (_.includes(registeredActions, actionName)) {
            throw new Error(`Action: ${actionName} is already registered`);
        }
    }
    wrapAction(actionFunction, actionName) {
        this.checkActionRegistered(this.registeredActions, actionName);
        this.registeredActions.push(actionName);
        const wrapped = (payload) => {
            payload = payload || {};
            this.dispatch({
                type: actionName,
                payload,
                actionMutator: actionFunction
            });
        };
        return mobx_1.action(wrapped);
    }
}
function getStoreInstance(state, dispatch) {
    const store = new Store(state, dispatch);
    const connectActionsToStore = (actions) => store.connectActions(actions);
    // Don't allow access directly to store
    return {
        connectActionsToStore,
        getState: () => store.state
    };
}
function applyMiddleware(...middleware) {
    return (state, dispatch) => {
        const getState = () => state;
        // Make compliant with redux middleware api
        const middlewareAPI = { getState, dispatch };
        const chain = middleware.map(middleware => middleware(middlewareAPI));
        dispatch = compose_1.default(...chain)(dispatch);
        return getStoreInstance(state, dispatch);
    };
}
exports.applyMiddleware = applyMiddleware;
function createStore(state, enhancer) {
    const dispatch = (action) => action.actionMutator(action.payload)(state);
    if (enhancer) {
        return enhancer(state, dispatch);
    }
    else {
        return getStoreInstance(state, dispatch);
    }
}
exports.createStore = createStore;
