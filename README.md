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


```panel.ts
import * as React from 'react';
import Tabs from '../Common/Tabs/Tabs';
import Pane from '../Common/Tabs/Pane';
import PanelActions from './panel-actions';
import { injectAndObserve, StoreState } from '../../../register-store';

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
                      panelId={BimPanels.ProjectBrowser}>

                    // ...content
                </Pane>

                <Pane label='Selection sets'
                      panelId={BimPanels.SelectionSets}>

                    // ...content
                </Pane>
            </Tabs>
        </div>
    );
}

export default injectAndObserve(Panel);
```
