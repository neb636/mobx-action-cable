import { DispatchMiddleware } from '../interfaces';


export const storeLogger: DispatchMiddleware = (store) => next => (action) => {
    const { payload, type } = action;

    console.group(action.type);

    console.info('dispatching', { payload, type });
    next(action);
    console.log('next state', store.getState());
    console.groupEnd();
};