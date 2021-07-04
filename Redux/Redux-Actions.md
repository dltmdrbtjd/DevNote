# Ducks 구조와 Redux-Actions 사용하기
- 리덕스 공식 문서에는 ActionType, Action, Reducer 이 3가지를 따로 따로 다룬다. 그러다보니 하나의 액션을 추가하려면 3개의 다른 파일들을 수정해야한다. 가끔씩은 액션생성자를 하나하나 만들고 또 그것들을 dispatch하는 과정이 귀찮게 느껴질수도 있다. 상태 관리를 편하게 하자고 리덕스를 사용하는건데 오히려 더 복잡해지는 경우도있다. 그래서 redux-actions를 사용하면 더 편하게 리덕스를 쓸 수 있다.

### 패키지 설치
```javascript
yarn add redux-actions
```

## 기본적인 Ducks 구조
```javascript

// Actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// Action Creators
export function logOut() {
  return { type: LOG_OUT, user };
}

export function getUser(coffee) {
  return { type: GET_USER, user };
}

export function setUser(coffee) {
  return { type: SET_USER, user };
}


// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}
```
최상단에 액션타입을 정의하고 리듀서를 정의하여 export default로 내보내고 같은 파일에서 액션생성자도 export를 통해 내보낸다. 그리고 리듀서를 만들때는 export default로 내보내고 액션 생성자는 export로 내보내주어야 한다. 그럼 redux-actions에서 어떻게 더 쉽게 관리할 수 있을까?

## redux-actions를 통한 더 쉬운 액션관리
- 위 코드에서 Action Creators에서 그냥 파라미터로 전달받은 값을 객체에 넣는것뿐인 작업을 자동화하는걸 createAction을 사용한다면 위 작업을 간단하게 아래와 같이 자동화 할 수 있다.
```javascript
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
```


## Reducer에서 switch문 대신 handleActions 사용하기
- 리듀서에서 액션의 type에 따라 다른 작업을 하기 위해서 위에서는 switch문을 사용했다. 하지만 이 방식엔 아주 중요한 결점이 있다. 그건 바로 스코프가 리듀서 함수로 설정되어 있다는 것이다. 그렇기 때문에 서로 다른 case에서 let이나 const를 통하여 변수를 선언하려고 하다보면 같은 이름이 중첩될시엔 에러가 발생한다. 이 문제를 해결해 주는것이 바로 handleActions이다. 이 함수를 사용하면 아래와 같이 사용할 수 있다.

```javascript
const reducer = handleActions({
    [LOG_OUT]: (state, action) => state,
    [SET_USER]: (state, action) => state,
    [GET_USER]: (state, action) => state,
}, initialState);
```

위는 handleActions를 통하여 만든 리듀서의 기본 틀이다.
