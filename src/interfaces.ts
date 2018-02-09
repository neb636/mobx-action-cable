
export type ActionFunction<State, Payload> = (payload: Payload) => (state: State) => void | Promise<void>;

export type ActionDefinition<State, Payload> = {
    type: string;
    payload: Payload;
    actionMutator: ActionFunction<State, Payload>;
};

export type DispatchMiddleware = (store: { getState: any; }) => (next: any) => <Payload, State>(actionDefinition: ActionDefinition<State, Payload>) => void;
export type Dispatch = (store: { getState: any; }) => AppliedDispatch;

export type AppliedDispatch = <Payload, State>(actionDefinition: ActionDefinition<State, Payload>) => void;
export type AppliedMiddleware = <State>(state: State, dispatch: Dispatch) => AppliedDispatch;
export type ApplyMiddleware = <State>(...middleware: DispatchMiddleware[]) => AppliedMiddleware;