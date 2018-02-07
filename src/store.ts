import {
    ActionDefinition, ActionFunction, Dispatch, DispatchMiddleware, StoreEnhancer, StoreInstance
} from './interfaces';
import { action, useStrict } from 'mobx';
import compose from './compose';


useStrict(true);


class Store<State> {

    registeredActions: string[] = [];

    constructor(public state: State,
                public dispatch: Dispatch) {
    }

    connectActions<Actions>(actions: Actions): Actions {

        return Object.keys(actions).reduce((connectedActions, actionName) => {
            const wrappedAction =  this.wrapAction(action, actionName);

            connectedActions[actionName] = wrappedAction;

            return connectedActions;

        }, <Actions>{});
    }

    private checkActionRegistered(registeredActions: string[], actionName: string) {

        if (registeredActions.includes(actionName)) {
            throw new Error(`Action: ${actionName} is already registered`);
        }
    }

    private wrapAction<Action, Payload>(actionFunction: ActionFunction<State, Payload>, actionName: string) {
        this.checkActionRegistered(this.registeredActions, actionName);
        this.registeredActions.push(actionName);

        const wrapped = (payload: Payload) => {
            payload = payload || <Payload>{};

            this.dispatch({
                type: actionName,
                payload,
                actionMutator: actionFunction
            });
        };

        return action(wrapped);
    }
}


function getStoreInstance<State>(state: State, dispatch: Dispatch): StoreInstance<State> {
    const store = new Store<State>(state, dispatch);
    const connectActionsToStore = <Actions>(actions: Actions): Actions => store.connectActions(actions);

    // Don't allow access directly to store
    return {
        connectActionsToStore,
        getState: () => store.state
    };
}


export function applyMiddleware(...middleware: DispatchMiddleware[]): StoreEnhancer {

    return <State>(state: State, dispatch: Dispatch) => {
        const getState = () => state;

        // Make compliant with redux middleware api
        const middlewareAPI = { getState, dispatch };
        const chain = middleware.map(middleware => middleware(middlewareAPI));

        dispatch = compose(...chain)(dispatch);

        return getStoreInstance(state, dispatch);
    }
}

export function createStore<State, Ext, StateExt>(state: State, enhancer?: StoreEnhancer): StoreInstance<State> {
    const dispatch = <State, Payload>(action: ActionDefinition<State, Payload>) => action.actionMutator(action.payload)(state);

    if (enhancer) {
        return enhancer<State>(state, dispatch);
    }
    else {
        return getStoreInstance(state, dispatch);
    }
}