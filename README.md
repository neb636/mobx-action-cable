<img width="372" alt="screen shot 2018-02-08 at 9 44 56 pm" src="https://user-images.githubusercontent.com/4202152/36009267-722e2976-0d19-11e8-9b1a-0a883e6364a0.png">


# What is MobX Action Cable?

MobX Action Cable is a opinionated wrapper over MobX that handles state storage.

- Redux style API (compliant with most redux middleware)
- Importable no boilerplate typed actions


### Differences between MobX Action Cable and standard MobX?

#### Separation between State Definition and Actions



##### Standard MobX

```ts
class Todos {
    @observable todos: Todo[] = [];
    @observable fetchError: any;

    loadTodos() {
        // ...
    }
}

```


##### MobX Action Cable

```ts
class TodosState {
    @observable todos: Todo[] = [];
    @observable fetchError: any;
}


const loadTodos = () => ({ todosState }: State) => {
    // ...
};

const setTodos = (payload: { todos: Todo[] }) => ({ todosState }: State) => {
    // ...
};

const TodosActions = connectActionsToStore({
    setTodos
});

const TodosAsyncActions = connectActionsToStore({
    loadTodos
});
```


### Differences between MobX Action Cable and standard MobX?



## Example Code

#### `register-store.ts`
```ts
import { createState, createStore, getStateJSON } from 'mobx-action-cable';
import GlobalState from '../store.global/state';
import UserState from '../store.user/state';
import { createLogger } from 'redux-logger'

const logger = createLogger({
    collapsed: true,
    stateTransformer: getStateJSON
});

const mapStateNamespacesToState = () => {

    return {
        globalState: new GlobalState(),
        userState: new UserState()
    }
};


const state = createState(mapStateNamespacesToState);

export type State = ReturnType<typeof mapStateNamespacesToState>;


const {
    connectActionsToStore,
    connectAsyncActionsToStore,
    connect
} = createStore(state, applyMiddleware(logger));

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


#### `store.user/actions.ts`

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

#### `store.user/async-actions.ts`

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


#### `UserProfileCard/UserProfileCard.tsx`
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
