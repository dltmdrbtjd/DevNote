## Redux란 ?
```
yarn add redux react-redux
```
위와 같이 기본적으로 설치를해주고 시작하면된다.

- 리덕스는 데이터를 한 군데 몰아넣고, 여기저기에서 꺼내볼 수 있게 해주는 라이브러리이다. 대표적으로 알아야할 용어들은 State, Action, ActionCreator, Reducer, Store, dispatch 가 있다. 리덕스의 특징으로는 1프로젝트에서 store는 무조건 1개만 있어야한다. store는 참고로 리덕스를 이용해서 데이터들을 모아놓는곳이라고 생각하면 편하다. 그리고 store의 state(데이터)는 오직 action을 통해서만 변경할 수 있다. 또 Reducer는 순수한 함수여야 한다. 이 말의 의미는 파라미터 외의 값에 의존하지 않아야하고, 이전 상태는 수정하지 않는다. 그리고 파라미터가 같으면 항상 같은 값을 반환하고 리듀서는 이전 상태와 액션을 파라미터로 받는다.

- 상태관리의 흐름을 간단하게 말로 표현하면 리덕스 Store를 Component에 연결하고 Component에서 상태 변화가 필요할 때 Action을 부른다. 그리고 Reducer를 통해서 새로운 상태 값을 만들고, 새 상태값을 Store에 저장한다. 그 후 Component는 새로운 상태값을 받아온다.(props를 통해 받아와서 다시 렌더링!) 이런 흐름으로 돌아간다.


![리덕스 상태관리](https://user-images.githubusercontent.com/59644518/123538669-00d27180-d771-11eb-8663-d2c3477e778b.png)

위와 같은 방식으로 상태관리가 돌아간다고 볼 수 있다.

- 보통 리덕스를 사용할 때는 묘양새대로 action, actionCreator, reducer를 분리해서 작성한다. ( 액션은 액션끼리, 액션생성함수는 액션생성함수끼리, 리듀서는 리듀서끼리 작성 ) 이 구조는 모양대신 기능으로 묶어서 작성하는 방식이다. 
```javascript
// Actions
const LOAD   = 'coffee/LOAD';
const CREATE = 'coffee/CREATE';
const UPDATE = 'coffee/UPDATE';
const DELETE = 'coffee/DELETE';

initialState = {
  list: [
    { text: "커피가 너무 좋아좋아" },
    { text: "커피가 너무 좋아좋아" },
    { text: "커피가 너무 좋아좋아" },
  ]
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

export function createCoffee(coffee) {
  return { type: CREATE, coffee };
}

export function updateCoffee(coffee) {
  return { type: UPDATE, coffee };
}

export function deleteCoffee(coffee) {
  return { type: DELETE, coffee };
}

// Reducer
export default function reducer(state, action) {
  switch (action.type) {
    // 각각의 case문을 사용하여 현재의 상태와 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환한다.
    default: return state;
  }
}

```

위의 예시가 리덕스 모듈의 예시이다. 각각 순서를 살펴보자
1. Action ( 컴포넌트 변화의 수만큼 만든다. ) / ActionCreator 타입에 들어갈 녀석들을 만들어주는것
```javascript
const LOAD = 'bucket/LOAD';
const CREATE = 'bucket/CREATE';
```

2. initialState ( 초기 상태값을 만들어준다. 즉 기본값 )
```javascript
const initialState = {
  list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
};
```

3. ActionCreator ( 액션 생성 함수를 작성한다. ) / 액션을 만드는 함수이다. 단순히 파라미터를 받아와서 액션 객체 형태로 만들어준다.
```javascript
export const loadBucket = (bucket) => {
    return { type: LOAD, bucket };
}

export const createBucket = (bucket) => {
    return {type: CREATE, bucket};
}
```

4. Reducer ( 리듀서를 작성한다. load할땐 가지고있던 기본값을 그대로 뿌려주고 create할땐 새로 받아온 값을 가지고 있던 값에 더해서 리턴해준다. ) / 변화를 일으키는 함수이다. 리듀서는 두 가지의 파라미터를 받아오고 현재의 상태와, 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환한다.
```javascript
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "bucket/LOAD":
      return state;

    case "bucket/CREATE":
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };

    default:
      return state;
  }
}
```

5. Store ( ex) configStore.js 파일을 만들어 스토어를 만들어준다. ) / 리덕스에서 한 애플리케이션 당 하나의 스토어를 만들게 된다. 스토어 안에는 현재의 웹,앱 상태와 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있다.
```javascript
//configStore.js
import { createStore, combineReducers } from "redux";
import bucket from './modules/bucket';
import { createBrowserHistory } from "history";

// 브라우저 히스토리를 만들어줍니다.
export const history = createBrowserHistory();
// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가 한다.
const rootReducer = combineReducers({ bucket });

// 스토어를 만듭니다.
const store = createStore(rootReducer);

export default store;
```

-  리덕스와 컴포넌트를 연결하는법
아래는 index.js파일이다.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

// 우리의 버킷리스트에 리덕스를 주입해줄 프로바이더를 불러온다.
import { Provider } from "react-redux";
// 연결할 스토어도 가지고 온다.
import store from "./redux/configStore";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
```

## Dispatch , subscribe ( 디스패치, 구독 )
- 디스패치는 스토어의 내장함수 중 하나이다. 디스패치는 액션을 발생 시키는 것 이라고 이해하면 된다. dispatch라는 함수에는 액션을 파라미터로 전달한다. dispatch(action) 이런방식이다. 그렇게 호출을 하면 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어준다.

- 구독 또한 스토어의 내장함수 중 하나이다 .subscribe 함수는 함수 형태의 값을 파라미터로 받아온다. subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출된다.
