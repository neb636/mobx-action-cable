import { AppliedMiddleware } from './types';
import { createStoreConnector } from './create-store-connector';
import dispatch from './dispatch';
import { Store } from './store';


export function createStore<State, Ext, StateExt>(state: State, enhancer?: AppliedMiddleware) {
    const getState = () => state;
    let storeDispatch;

    if (enhancer) {
        storeDispatch = enhancer<State>(state, dispatch);
    } else {
        storeDispatch = dispatch({ getState });
    }

    const store = new Store<State>(state, storeDispatch);
    const connectActionsToStore = <Actions>(actions: Actions): Actions => store.connectActions(actions, false);
    const connectAsyncActionsToStore = <AsyncActions>(actions: AsyncActions): AsyncActions => store.connectActions(actions, true);
    const connect = createStoreConnector(getState);

    // Don't allow access directly to store
    return { connectActionsToStore, connectAsyncActionsToStore, state, connect };
}