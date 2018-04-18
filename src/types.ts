
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


export type Func0<R> = () => R;
export type Func1<T1, R> = (a1: T1) => R;
export type Func2<T1, T2, R> = (a1: T1, a2: T2) => R;
export type Func3<T1, T2, T3, R> = (a1: T1, a2: T2, a3: T3, ...args: any[]) => R;


export type Compose = {
    (): <R>(a: R) => R;
    <F extends Function>(f: F): F;
    <A, R>(
        f1: (b: A) => R, f2: Func0<A>
    ): Func0<R>;
    <A, T1, R>(
        f1: (b: A) => R, f2: Func1<T1, A>
    ): Func1<T1, R>;
    <A, T1, T2, R>(
        f1: (b: A) => R, f2: Func2<T1, T2, A>
    ): Func2<T1, T2, R>;
    <A, T1, T2, T3, R>(
        f1: (b: A) => R, f2: Func3<T1, T2, T3, A>
    ): Func3<T1, T2, T3, R>;
    <A, B, R>(
        f1: (b: B) => R, f2: (a: A) => B, f3: Func0<A>
    ): Func0<R>;
    <A, B, T1, R>(
        f1: (b: B) => R, f2: (a: A) => B, f3: Func1<T1, A>
    ): Func1<T1, R>;
    <A, B, T1, T2, R>(
        f1: (b: B) => R, f2: (a: A) => B, f3: Func2<T1, T2, A>
    ): Func2<T1, T2, R>;
    <A, B, T1, T2, T3, R>(
        f1: (b: B) => R, f2: (a: A) => B, f3: Func3<T1, T2, T3, A>
    ): Func3<T1, T2, T3, R>;
    <A, B, C, R>(
        f1: (b: C) => R, f2: (a: B) => C, f3: (a: A) => B, f4: Func0<A>
    ): Func0<R>;
    <A, B, C, T1, R>(
        f1: (b: C) => R, f2: (a: B) => C, f3: (a: A) => B, f4: Func1<T1, A>
    ): Func1<T1, R>;
    <A, B, C, T1, T2, R>(
        f1: (b: C) => R, f2: (a: B) => C, f3: (a: A) => B, f4: Func2<T1, T2, A>
    ): Func2<T1, T2, R>;
    <A, B, C, T1, T2, T3, R>(
        f1: (b: C) => R, f2: (a: B) => C, f3: (a: A) => B, f4: Func3<T1, T2, T3, A>
    ): Func3<T1, T2, T3, R>;
    <R>(
        f1: (b: any) => R, ...funcs: Function[]
    ): (...args: any[]) => R;
    <R>(...funcs: Function[]): (...args: any[]) => R;
}