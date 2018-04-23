import { ActionFunction, AppliedDispatch } from './types';
import { action, configure } from 'mobx';

configure({ enforceActions: 'strict' });

export class Store<State> {

    registeredActions: string[] = [];

    constructor(public state: State,
                public dispatch: AppliedDispatch) {
    }

    connectActions<Actions>(actions: Actions, isAsync: boolean): Actions {

        return Object.keys(actions).reduce((connectedActions, actionName) => {
            connectedActions[actionName] = this.wrapAction(actions[actionName], actionName, isAsync);

            return connectedActions;
        }, <Actions>{});
    }

    private checkActionRegistered(registeredActions: string[], actionName: string) {

        if (registeredActions.indexOf(actionName) > -1) {
            throw new Error(`Action: ${actionName} is already registered`);
        }
    }

    private wrapAction<Action, Payload>(actionFunction: ActionFunction<State, Payload>, actionName: string, isAsync: boolean) {
        this.checkActionRegistered(this.registeredActions, actionName);
        this.registeredActions.push(actionName);

        const wrapped = (payload: Payload) => {
            payload = payload || <Payload>{};

            this.dispatch({
                type: actionName,
                payload,
                actionMutator: actionFunction,
                isAsync
            });
        };

        return action(wrapped);
    }
}