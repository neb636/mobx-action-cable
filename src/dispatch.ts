import { ActionDefinition, Dispatch } from './interfaces';


const dispatch: Dispatch = (store) => <State, Payload>(action: ActionDefinition<State, Payload>): void => {

    action.actionMutator(action.payload)(store.getState());
};


export default dispatch;