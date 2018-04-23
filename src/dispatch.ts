import { ActionDefinition, Dispatch } from './types';


const dispatch: Dispatch = ({ getState }) => <State, Payload>(action: ActionDefinition<State, Payload>): void => {
    const { payload } = action;
    const state = getState();

    action.actionMutator(payload)(state);
};


export default dispatch;