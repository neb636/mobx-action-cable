import { action } from 'mobx';


export function createState<State>(stateCreator: (...params) => State): State {
    return action(() => stateCreator())();
}