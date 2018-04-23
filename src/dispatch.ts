import { ActionDefinition, Dispatch } from './types';
import { toJS } from 'mobx';


const dispatch: Dispatch = ({ getState }) => <State, Payload>(action: ActionDefinition<State, Payload>): void => {
    const { payload, isAsync } = action;
    const state = isAsync ? toJS(getState()) : getState();

    action.actionMutator(payload)(state);
};


export default dispatch;