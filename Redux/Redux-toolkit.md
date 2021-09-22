## Redux-toolkit
- redux-toolkit 패키지는 redux 논리를 작성하는 표준 방법이다. redux에 대한 세 가지 문제점들에 대해서 해결하기 위해서 만들어 졌다.
  - redux 저장소 구성이 너무 복잡하다
  - redux가 유용한 기능을 수행 할 수 있도록 많은 패키지를 추가해야 한다.
  - redux에서 boilerplate 코드가 너무 많이 필요하다.

- 모든 문제를 해결할 수 없지만 설정 프로세스를 추상화하고 가장 일반적인 use case를 처리하고 사용자의 애플리케이션 코드를 단순화 시킬 수 있는 유용한 util을 제공하려고 한다. 

## 포함되는 함수 및 util
- configureStore() : 단순화 된 구성 옵션을 제공한다. 슬라이스 리듀서를 자동으로 결합하고 제공하는 redux 미들웨어를 추가하고, 기본적으로 redux-thunk를 포함하며 redux devtools extension을 사용할 수 있다.
- createReducer() : 이 유틸리티는 switch문을 작성하지 않고 reducer함수를 작성할 수 있도록 한다. 또한 immer 라이브러리를 사용하여 state.todos[3].completed = true와 같은 일반적인 코드로 더 간단하게 불변성을 유지하면서 상태를 업데이트할 수 있다.
- createAction() : 이 유틸리티는 action type에 따라 action create함수를 반환한다. 함수 자체에 toString()이 정의되어 있으므로 별도의 상수를 선언할 필요 없이 함수 이름을 사용할 수 있다.
- createSlice() : 이 함수는 리듀서 함수 세트로, 슬라이스 이름 및 초기 상태 값을 받아서 자동으로 slice reducer와 action creator, action types를 생성한다. redux toolkit 사용시 제일 많이 사용하는 함수이다.

### 설치 방법
```
# npm
npm install @reduxjs/toolkit
# yarn
yarn add @reduxjs/toolkit
```

## configureStore 기본 구조
```javascript
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import ListReducer from './List'
import logger from 'redux-logger'

const rootReducer = combineReducers({
  list: ListReducer,

// 기본 미들웨어로는 redux-thunk를 사용하는데 thunk를 쓰지 않거나 saga등의 다른 미들웨어가 필요하다면 아래와 같이 설정한다.

const store = configureStore({
  reducer: rootReducer
  middleware: [...getDefaultMiddleware(), logger]
)};
```

## createAction 기본 구조
```javascript
const users = [
  {
    name: 'lee',
    age: 27,
    gender: 'male'
  },
  {
    name: 'kim',
    age: 26,
    gender: 'female'
  }
]

const userlist = createAction('list/userlist');

let action = userlist();
// return { type: 'list/userlist' }

action = userlist(users)
// return { type: 'list/userlist', payload: users }
```

## createReducer 기본 구조
```javascript
const increment = createAction('increment')
const decrement = createAction('decrement')

const counterReducer = createReducer(0, {
  [increment]: (state,action) => state + action.payload,
  [decrement.type]: (state,action) => state - action.payload
});
```

### 불변성 유지 ( immer를 내부적으로 사용중이다. )
```javascript
const listReducer = createReducer([], {
  ['addList']: (state, action) => {
    state.push(action.payload);
  }
});
```

## createSlice 기본 구조 ( action + reducer / 제일 많이 사용한다. )
```javascript

const userSlice = createSlice({
  // 액션 타입 문자열의 prefix로 들어간다. ex) "users/addUser"
  name: 'users',
  // 초기값
  initialState: [],
  // 리듀서
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
  },
});

const { actions, reducer } = userSlice;
export const { addUser } = actions;
export default reducer;
```

## createAsyncThunk() 미들웨어함수 사용법
```javascript
const fetchUserLoad = createAsyncThunk('user/LOAD', async() => {
  // 첫 번째 인자에 액션타입을 지정해준다.
  // 두 번째 인자에 미들웨어 함수를 만든다.
  try {
    const response (await axios.get('url')).data;
    return response;
  } catch (err) {
    return console.error(err)
  }
});
// 위와 같이 미들웨어 함수를 생성하고 아래 createSlice함수에서 extraReducer를 만들어 사용한다.

const initialState = {
  list: [],
  loading: false,

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{},
  extraReducers: {
    [fetchUserLoad.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchUserLoad.fulfilled.type]: (state, action) => {
      state.list = payload.action;
      state.loading = false;
    },
    [fetchUserLoad.rejected.type]: (state) => {
      state.list = initialState.list;
      state.loading = false;
    },
  },
});

const UserCreators = {
  fetchUserLoad,
}

export { UserCreators };
const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
```
## TypeScript 사용시 useSelector 편하게 사용하는법
- configureStore안에서 설정한다.
```javascript
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// useSelector hook 대신 사용한다.
// useSelector 함수의 파라미터에 타입을 지정하지 않아도 되는 장점이 생긴다.
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelctor: TypedUseSelectorHook<RootState> = useSelector;
```

### 정리
- HANG프로젝트를 진행하면서 사용했던 기능들을 정리해보았는데 추가적으로 payloadAction등등 더 사용하긴 헀지만 우선 기본적인 내용과 유용했던 기능들을 정리해보았다.
- 출처 및 참고 : https://blog.rhostem.com/posts/2020-03-04-redux-toolkits
