
export type ActionFunction<State, Payload> = (payload: Payload) => (state: State) => void | Promise<void>;

export type ActionDefinition<State, Payload> = {
    type: string;
    payload: Payload;
    actionMutator: ActionFunction<State, Payload>;
};

export type DispatchMiddleware = (store: { getState: any; dispatch: Dispatch }) => (next: Dispatch) => Dispatch;
export type Dispatch = <Payload, State>(actionDefinition: ActionDefinition<State, Payload>) => void;


export interface StoreInstance<State> {
    connectActionsToStore: <Actions>(actions: Actions) => Actions;
    getState: () => State;
}


export type StoreEnhancer = <State>(state: State, dispatch: Dispatch) => StoreInstance<State>;