## Redux-saga
- redux-saga는 redux-thunk와 마찬가지로 redux middleware로써 redux 사용시 비동기 요청의 side effect를 줄이기 위해서 사용된다. 지금까지는 redux-thunk를 사용하거나 컴포넌트에서 비동기 요청을 직접 처리했었는데 redux-saga를 통해서 thunk와는 다르게 effect를 관리하는 기능들이 많고 유연하고 이점이 많다고 생각이 들었다. redux-saga는 애플리케이션 부작용(ex. 데이터 가져오기와 같은 비동기 작업 및 브라우저 캐시 액세스와 같은 불순한 작업)을 더 쉽게 관리하고, 실행하기 쉽고, 테스트하기 쉽고, 오류 처리를 더 잘하는 것을 목표로 하는 라이브러리다. 라고 설명되어있다. 직접 연습을 통해 사용해본 결과 제어할 수 있는 부분들이 엄청 많다고 생각되었다.
- redux-saga는 generator라는 es6기능을 사용하기 때문에 미리 generator에 대한 공부를 하고 사용해야 무리없이 사용할 수 있다. generator의 반환 값은 iterator이자 iterable인데 javascript의 array, set map은 for of 문으로 순회가 가능한 이유가 이 세 가지 모두 iterable, iterator 프로토콜을 따르기 때문이다. 구글 개발자 모드를 통해 array를 보면 [Symbol.iterator]를 가진 iterable이라는 걸 알 수 있다. iterable은 iterator를 리턴하는 [Symbol.iterator]를 가진 값이며 iterator는 value와 done을 가진 객체를 리턴하는 next() 함수를 가진 값이다.

## Redux-saga의 주요 함수
- delay : 설정된 시간 이후에 resolve하는 Promise객체를 리턴한다.
```javascript
delay(1000)
// 1초 기다리고 실행
```
- put : 특정 액션을 dispatch하도록 한다.
```javascript
put({ type: 'LOAD_POST_REQUEST' })
// LOAD_POST_REQUEST action을 dispatch 한다.
```

- takeEvery : 들어오는 모든 액션에 대해 특정 작업을 처리해준다.
```javascript
takeEvery(LOAD_POST_SUCCESS, fetchLoadSaga)
// 들어오는 LOAD_POST_SUCCESS 액션에 대해 fetchLoadSaga 함수를 실행한다.
```

- takeLatest : 기존에 진행중이던 작업이 있다면 취소하고 가장 마지막으로 실행된 작업만 수행한다.
```javascript
takeLatest(DECREASE_ASYNC, decreaseSaga)
// DECREASE_ASYNC액션에 대해서 기존에 진행중이던 작업이 있다면 취소하고 가장 마지막으로 실행된 작업에 대해서만 decreaseSaga함수를 실행한다.
```

- call : 함수의 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
```javascript
call(delay, 1000)
// delay(1000)함수를 call함수를 이용해서 이렇게 사용할 수 있다.
// call과 put의 차이점은 put은 store에 인자로 들어온 action을 dispatch하고, call인 경우에는 주어진 함수를 실행하게 된다.
```

- all : all함수를 사용해서 제너레이터 함수를 배열의 형태로 인자에 넣어주면, 제너레이터 함수들이 병렬적으로 동시에 실행되고, 전부 resolve될때까지 기다린다. Promise.all과 비슷하다.
```javascript
yield all([testSaga(), testSaga2(), testSaga3()])
// testSaga()와 testSaga2(),testSaga3()이 동시에 실행되고, 모두 resolve될때까지 기다린다.
```

참고 문서 : https://mskims.github.io/redux-saga-in-korean/
직접 만든 예제 : https://github.com/dltmdrbtjd/Redux-saga-prac
