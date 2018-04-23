import { AppliedDispatch, ApplyMiddleware, Dispatch, DispatchMiddleware } from './types';
import compose from './compose';


const applyMiddleware: ApplyMiddleware = (...middleware: DispatchMiddleware[]) => {

    return <State>(state: State, dispatch: Dispatch) => {
        const getState = () => state;

        // Make compliant with redux middleware api
        const middlewareAPI = { getState };
        const chain = middleware.map(middlewareFn => middlewareFn(middlewareAPI));

        return <AppliedDispatch> compose(...chain)(dispatch(middlewareAPI));
    };
};


export default applyMiddleware;