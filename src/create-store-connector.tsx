import { observer } from 'mobx-react';
import * as React from 'react';
import { MapStateToProps } from './types';


export function createStoreConnector(getState: () => { [key: string]: any }) {

    return function<Component>(mapStateToProps: MapStateToProps): (UnwrappedComponent: Component) => Component {

        return (UnwrappedComponent: any) => {

            const WrappedClass: any = class extends React.Component {

                render() {
                    const state = getState();
                    const mappedProps = mapStateToProps(state);

                    return <UnwrappedComponent { ...mappedProps } { ...this.props } />;
                }
            };

            return observer(WrappedClass);
        };
    }
}