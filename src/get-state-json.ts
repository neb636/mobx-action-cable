import { toJS } from 'mobx';
import * as _ from 'lodash';

export function getStateJSON(state) {

    return Object.keys(state).reduce((reducedState, key) => {
        const module = state[key];

        reducedState[key] = getStateNamespaceLog(module);


        return reducedState;
    }, {});
}


function getStateNamespaceLog(module) {

    return getLogKeys(module).reduce((set, propKey) => {

        // TODO: Find better way to get value for computed only if it has been set
        try {
            let value = toJS(module[propKey]);;

            return { ...set, [ propKey ]: value };
        }
        catch(error) {
            return set;
        }
    }, {});

}


function getLogKeys(module) {
    const objectKeys = Object.keys(module);
    const protoKeys = Object.getOwnPropertyNames(module.__proto__).filter(key => {
        return key !== 'constructor' && !key.startsWith('_');
    });

    return _.uniq([...objectKeys, ...protoKeys]);
}