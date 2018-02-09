<img width="372" alt="screen shot 2018-02-08 at 9 44 56 pm" src="https://user-images.githubusercontent.com/4202152/36009267-722e2976-0d19-11e8-9b1a-0a883e6364a0.png">

Opinionated MobX state storage
#### Register store
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


#### Action file
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

#### Component
```tsx

type Props = { storeState?: StoreState };


function Panel(props: Props) {
    const { storeState } = this.props;

    return (
        <div className='Panel'>

            <Tabs theme='Tabs--bim-panel'
                  selectedPanel={storeState.activePanel}
                  onClickTab={(tab) => PanelActions.changePanel({ panel: tab })}>

                <Pane label='Project Browser'
                      disabled={storeState.selectionSetPending}
                      panelId='Main'>

                    // ...content
                </Pane>

                <Pane label='Selection sets'
                      panelId='Second'>

                    // ...content
                </Pane>
            </Tabs>
        </div>
    );
}

export default injectAndObserve(Panel);
```
