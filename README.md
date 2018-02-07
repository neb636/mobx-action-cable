# MobX Action Cable
Opinionated MobX state storage

```ts

export class StoreState {
    @observable activePane: string;

    @computed get activePanelSer() {

        return !!this.activePanel;
    }
}

const storeState = new StoreState();
const injectAndObserve = createStoreConnector('storeState');

const { connectActionsToStore } = createStore(storeState, applyMiddleware(logger));

export {
    storeState,
    connectActionsToStore,
    injectAndObserve
};
```



```ts

const changePanel = (payload: { panel: string }) =>
                    (state: StoreState) => {

    const { panel } = payload;
    state.activePanel = panel;
};

const PanelActions = connectActionsToStore({
    changePanel
});

export default PanelActions;
```
