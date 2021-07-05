# Immer
- immer는 굉장히 편리한 불변성 유지 라이브러리 이다. 마치 불변성에 대해서 신경쓰지 않는것 처럼 데이터를 업데이트 해주면, 라이브러리가 알아서 불변성 유지를 해주면서 업데이트를 처리해준다.

< 패키지 설치 >
```javascript
yarn add immer
```

< immer 불러오기 >
```javascript
import produce from 'immer';
```

- produce : produce 함수 사용시 첫번째 파라미터는 수정하고 싶은 상태, 두번째 파라미터 에서는 어떻게 업데이트하고 싶을지 정의하는 함수 이렇게 들어갑니다. 두번째 파라미터에 넣는 함수에서는 불변성에 대해서 신경쓰지 않고 그냥 업데이트 해주면 다 알아서 처리해줍니다.

< 예시 코드 >
```javascript
import produce from 'immer';

const initialState = {
  list:[
    {
      coffee: 'Espresso',
      check: true,
    },
    {
      coffee: 'Ice Americano',
      check: false,
    },
  ];
}
const nextState = produce(initialState, draftState => {
  draftState.push({ coffee: 'Ice Latte' });
  draftState[1].check = true;
});
```
위와 같은 형식으로 사용할 수 있다. push를 사용해도 불변성은 유지가된다. 이런 형태로 불변성을 유지하면서 리덕스의 데이터를 변경하고 수정하고 새로 추가하고등등을 처리할 수 있다.

< 리액트에서 사용한 예제 >
```javascript
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// Action Type 정의
const CREATE = 'coffee/CREATE';

// Action Creators 정의
export const createCoffee = createAction(CREATE, coffee => coffee);

// 초기값 설정
const initialState = {
  list:[
    {
      coffee: 'Espresso',
      check: true,
    },
    {
      coffee: 'Ice Americano',
      check: false,
    },
  ];
}

// handleActions로 리듀서 함수 작성
export default handleActions(
  {
    [CREATE]: (state, action) =>
      produce(state, draft => {
        draft.list.push({
          coffee: 'Ice Lattee',
          check: true,
        });
      }),
  }, initialState);
```
위와 같이 리덕스에 새로운 데이터를 불변성을 유지하면서 추가하는 예제를 만들어보았다. 여러가지 예로 리스트를 받아서 새로 뿌려주는것도 가능하고 값을 바꾸고 리스트들을 정렬을 시켜주고 등등을 불변성을 유지하면서 사용할 수 있다.
