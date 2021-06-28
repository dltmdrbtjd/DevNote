# Redux에서 FireStore 사용
- Firestore 데이터를 리덕스 스토어에 넣으려면 우선 미들웨어를 설치해야한다. firestore에서 데이터를 가지고 올때는 비동기 통신을하기 때문에 비동기 통신을 할 때 필요한 미들웨어를 먼저 설치해줘야한다.
- 미들웨어 : 리덕스 데이터를 수정할 떄 [액션이 디스패치 -> 리듀서에서 처리] 하던 과정이 있다. 여기서 미들웨어는 이 과정 사이에 미리 사전 작업을 할 수 있도록 중간 다리를 하는 역할을 한다. [액션 발생 -> 미들웨어 할 일 하기 -> 리듀서에서 처리] 이 순서로 처리하게 된다.

```
yarn add redux-thunk
```

- 액션 생성 함수가 반환하는건 객체를 반환하기 때문에 redux-thunk는 객체 대신 함수를 생성하는 액션 생성함수를 작성할 수 있게 도와준다. 그게 필요한 이유는 리덕스는 기본적으로 액션 객체를 디스패치한다. 즉 함수를 생성하면 특정 액션이 발생하기 전에 조건을 주거나, 어떤 행동을 사전에 처리할 수 있다.

```javascript
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bucket from "./modules/bucket";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ bucket });
const store = createStore(rootReducer, enhancer);

export default store;
```
설치가 완료되면 위와같이 store에 연결시켜준다.

그 후에 리듀서를 아래와 같은 형식으로 고쳐준다.
```javascript
case "bucket/LOAD": {
      if(action.bucket.length >0){
        return { list: action.bucket };
      }

      return state;
    }
```

그 후에 App.js에서 불러서 사용한다. 
```javascript
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadBucketFB());
  },
  create: (new_item) => {
    console.log(new_item);
    dispatch(createBucket(new_item));
  }
});
```

이런식으로 create,update,delete도 모두 불러와서 같은 방식으로 적용시켜주면 된다.
사실 모든 파일을 다 보면서 이해해야 하지만 간략하게 그 사용법들에 대해서만 짧게 정리해보았다! 
