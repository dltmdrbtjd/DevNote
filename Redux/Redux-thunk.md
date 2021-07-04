# Redux Thunk
- 리덕스에서는 비동기처리를 위해 여러 미들웨어를 사용하는데 그 중 redux-thunk에 대해서 정리해보겠다.


## Redux middleware
- 리덕스 미들웨어는 리덕스에서 액션이 디스패치된 이후에 리듀서에서 상태를 변경하기 전에 추가 작업을 할 수 있도록 도와준다. 상태를 변경하기전 액션을 취소하거나 콘솔에 액션 혹은 상태값 출력, 그리고 상태값을 변경하여 리듀서에 전달할수도 있다. 다른 것으로는 특정 액션이 발생 하였을때 다른 액션을 발생하게 하거나 함수를 실행 시킬 수 있다. 일반적으로는 비동기 작업을 처리할 때 가장 많이 사용되며 API호출을 위해 사용한다.

``` javascript
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from './redux-thunk';
import reducer from './reducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRoute(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];
// redux내부에서 history 처리를 하기 위해서 history도 담아서 보내준다.

const store = createStore(reducer, applyMiddleware(...middlewares));
// redux의 applyMiddleware를 사용하여 createStore로 store생성시 사용한다.

```

## 그럼 Redux-thunk는 뭘 하는 미들웨어인가?
- 쉽게 말하면 미들웨어는 객체 대신 함수를 생성하는 액션 생성함수를 작성할 수 있도록 도와준다. 리덕스에서는 기본적으로 액션 자체를 디스패치한다. 일반 액션생성자는 아래 코드와 같이 파리미터를 가지고 액션 객체를 생성하는 작업만한다.
```javascript
const ActionCreator = (payload) => ({action: 'ACTION', payload});
```
즉 특정 액션이 몇초뒤에 실행하게 하거나 현재 상태에 따라 무시되게 하거나 등등을 하려면 일반 액션생성자로는 할 수 없다. 그때 이걸 가능하게 해주는것이 바로 redux-thunk이다.
아래는 1초뒤 액션이 디스패치 되는 예제 코드이다.
### < 예제 코드 > // 1초뒤 디스패치하기
```javascript
const CREATE = 'CREATE';

const createCoffee = (coffee) => {
  return { type:CREATE, coffee };
};

const createCoffeeAsync = (coffee="") => {
  return function (dispatch, getState, {history}) { // dispatch,getState,history를 파라미터로 가지는 함수를 리턴!
    setTimeout( () => {
      dispatch(createCoffee()); // 1초뒤에 dispatch 실행!
    }, 1000);
  };
};

```
위 코드에서처럼 우선 dispatch,getState,history를 가진 함수를 리턴한다. dispatch는 dispatch를 시켜주는 파라미터이고 2번째로 온 getState를 파라미터로 받아오면 스토어의 상태에도 접근할 수 있다. 따라서 현재의 스토어 값에 따라 액션이 dispatch될지 무시될지 정해줄 수 있다. 그 후 3번째 파라미터는 위예제에서 만든 history를 가져와서 redux안에서 사용해줄 수 있게 되는것이다. 즉 redux-thunk는 일반 액션 생성자에 날개를 달아주는것과 같다고 볼 수 있다. 보통의 액션생성자는 그냥 하나의 액션객체를 생성할 뿐이지만 redux-thunk를 통해 만들게 되면 그 내부에서 여러가지 작업을 할 수도 있게되는것이다.
