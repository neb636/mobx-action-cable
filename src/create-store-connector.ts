import { observer, inject, IReactComponent } from 'mobx-react';

export function createStoreConnector(storeName: string) {

    return <T extends IReactComponent>(component: T): T => inject(storeName)(observer(component));
}