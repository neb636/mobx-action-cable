import { observer, inject, IReactComponent } from 'mobx-react';
import * as React from 'react';

export function createStoreConnector(storeName: string) {

    const injectAndObserve = <T extends IReactComponent>(component: T): T => {
        return inject(storeName)(observer(component));
    };

    function connect<State>(mapStateToProps: (state: State) => any) {
        type MappedProps = ReturnType<typeof mapStateToProps>;

        return (WrappedComponent) => {

            const StateToPropsMerger = class extends React.Component {

                render() {
                    const mappedProps = mapStateToProps(this.props[storeName]);

                    return <WrappedComponent { ...mappedProps } { ...this.props } />;
                }
            };

            return injectAndObserve(StateToPropsMerger);
        };
    }

    return { connect };
}