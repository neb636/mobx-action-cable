import { ApplyMiddleware, Dispatch, DispatchMiddleware } from './interfaces';
import compose from './compose';


const applyMiddleware: ApplyMiddleware = (...middleware: DispatchMiddleware[]) => {

    return <State>(state: State, dispatch: Dispatch) => {
        const getState = () => state;

        // Make compliant with redux middleware api
        const middlewareAPI = { getState };
        const chain = middleware.map(middleware => middleware(middlewareAPI));

        return compose(...chain)(dispatch(middlewareAPI));
    }
};


export default applyMiddleware;