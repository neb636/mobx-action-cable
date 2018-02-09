import { createStore, applyMiddleware, storeLogger, computed, observable } from '../src';
import logger from 'redux-logger';

let storeState, PaneActions;

class StoreState {
    @observable activePane: string;

    @computed get activePanelSet() {

        return !!this.activePane;
    }
}


describe('with middleware', () => {

    beforeEach(() => {
        storeState = new StoreState();
        const { connectActionsToStore } = createStore(storeState, applyMiddleware(logger, storeLogger));

        const setActivePane = (payload: { pane: string }) => (state) => {
            state.activePane = payload.pane;
        };

        PaneActions = connectActionsToStore({
            setActivePane
        });
    });

    test('action mutates store correctly', () => {
        const activePane = 'Main';

        PaneActions.setActivePane({ pane: activePane });

        expect(storeState.activePane).toBe(activePane);
    });
});


describe('without middleware', () => {

    beforeEach(() => {
        storeState = new StoreState();
        const { connectActionsToStore } = createStore(storeState);

        const setActivePane = (payload: { pane: string }) => (state) => {
            state.activePane = payload.pane;
        };

        PaneActions = connectActionsToStore({
            setActivePane
        });
    });

    test('action mutates store correctly', () => {
        const activePane = 'Main';

        PaneActions.setActivePane({ pane: activePane });

        expect(storeState.activePane).toBe(activePane);
    });
});

