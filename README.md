# MobX Action Cable
Opinionated MobX state storage


#### Register store
```ts
import { createState, createStore } from 'mobx-action-cable';
import GlobalState from '../store.global/state';
import UserState from '../store.user/state';

const mapStateNamespacesToState = () => {

    return {
        globalState: new GlobalState(),
        userState: new UserState()
    }
};


const state = createState(mapStateNamespacesToState);

export type State = ReturnType<typeof mapStateNamespacesToState>;


const { connectActionsToStore, connectAsyncActionsToStore, connect } = createStore(state, applyMiddleware(...middleware));

export {
    connect,
    connectActionsToStore,
    connectAsyncActionsToStore
};
```


#### `store.user/state.ts`

```ts
import { observable, computed } from 'mobx-action-cable';


export class UserState {
    @observable firstName: string;
    @observable lastName: string;
    @observable birthday: string;
    @observable email: string;

    @computed get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
```


#### User Action file

```ts
import { connectActionsToStore, State } from './register-store';


const setUserState = (payload: { user: UserState }) => (state: State) => {
    state.userState = payload.user;
};

const updateBirthday = (payload: { birthday: string }) => ({ userState }: State) => {
    userState.birthday = payload.birthday;
};

const UserActions = connectActionsToStore({
    setUserState,
    updateBirthday
});

export default UserActions;
```

#### User Async Action file

```ts
import { connectAsyncActionsToStore, State } from '../register-store';
import UserActions from './actions.ts';
import GlobalActions from '../store.global/actions.ts';
import { RestApiService } from './rest-api-service';


const fetchUser = (payload: { email: string }) => async ({ userState }: State) => {
    const { email } = payload;

    try {
        const user = await RestApiService.user.get(email);

        // Dispatch sync action after async calls
        UserActions.setUserState({ user });
    }
    catch (error) {
        GlobalActions.setAuthenticationError({ error })''
    }
};


const UserAsyncActions = connectAsyncActionsToStore({
    fetchUser
});

export default UserAsyncActions;
```


#### Component
```tsx
import { connect, State } from '../register-store.ts';
import UserActions from '../store.user/actions.ts';

type Props = {
    someRegularProp: string
};

type InjectedProps = ReturnType<typeof mapStateToProps>;


function UserProfileCard(props: Props & InjectedProps) {
    const { fullName, birthday } = props;

    return (
        <div className='UserProfileCard'>

            <div>{ fullName }</div>
            <div>{ birthday }</div>

            <button onClick={ () => UserActions.updateBirthday({ birthday: '01/23/45' }) }>
                Update Birthday to 01/23/45
            </button>
        </div>
    );
}


const mapStateToProps = (state: State) => {
    const { fullName, birthday } = state.userState;

    return {
        fullName,
        birthday
    };
};

export default connect(mapStateToProps)(UserProfileCard);
```
