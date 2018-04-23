import { Compose } from './types';


const compose: Compose = (...funcs: any[]) => {

    if (funcs.length === 0) {
        return (arg: any) => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
};


export default compose;