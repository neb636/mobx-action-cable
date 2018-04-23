import { observer } from 'mobx-react';
import * as React from 'react';
import { Connect } from './types';


export function createStoreConnector<State>(getState: () => State): Connect<State> {

    return mapStateToProps => UnwrappedComponent => {

        const WrappedClass = class extends React.Component {

            render() {
                const state = getState();
                const mappedProps = mapStateToProps(state);

                return <UnwrappedComponent { ...mappedProps } { ...this.props } />;
            }
        };

        return observer(WrappedClass);
    };
}