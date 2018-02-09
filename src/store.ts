import { ActionFunction, AppliedDispatch } from './interfaces';
import { action, useStrict } from 'mobx';


useStrict(true);


export class Store<State> {

    registeredActions: string[] = [];

    constructor(public state: State,
                public dispatch: AppliedDispatch) {
    }

    connectActions<Actions>(actions: Actions): Actions {

        return Object.keys(actions).reduce((connectedActions, actionName) => {
            const wrappedAction =  this.wrapAction(actions[actionName], actionName);

            connectedActions[actionName] = wrappedAction;

            return connectedActions;
        }, <Actions>{});
    }

    private checkActionRegistered(registeredActions: string[], actionName: string) {

        if (registeredActions.indexOf(actionName) > -1) {
            throw new Error(`Action: ${actionName} is already registered`);
        }
    }

    private wrapAction<Action, Payload>(actionFunction: ActionFunction<State, Payload>, actionName: string) {
        this.checkActionRegistered(this.registeredActions, actionName);
        this.registeredActions.push(actionName);

        const wrapped = (payload: Payload) => {
            payload = payload || <Payload>{};

            this.dispatch({
                type: actionName,
                payload,
                actionMutator: actionFunction
            });
        };

        return action(wrapped);
    }
}