## State 관리에 대하여
- 단방향 데이터 흐름 : 데이터가 위에서 아래로 부모에서 자식으로 넘겨줘야 한다는 소리이다. 왜 이렇게 사용하여야 할까? 라이프 사이클을 생각해보자 부모 컴포넌트 state가 업데이트 되면 자식 컴포넌트도 리렌더링이 일어난다. 만약 자식 컴포넌트의 state가 바뀐 걸 부모 컴포넌트가 props로 받는다? 그럼 자식 컴포넌트가 업데이트되면 부모도 업데이트되고 그런 계속 리렌더링의 연속... 이유를 알겠는가?

- 클래스형 컴포넌트에서 state관리 : setState()를 이용하여 관리하면 된다. 클래스형 컴포넌트의 state를 업데이트할 때 사용하는 함수이다.
```
addNemo = () => {
    // this.setState로 count를 하나 더해줍니다!
    this.setState({ count: this.state.count + 1 });
  };
```
예를 들어서 버튼 클릭시에 임의의 박스를 1개 추가해주는 기능을 만든다고 치자 그럼 constructor에는 기본적으로 보여질 state.count가 있을것이고 그 값을 예시로 3이라고 하겠다. 우선 또한 박스의 개수를 count의 숫자만큼 보여준다고 가정하겠다. 그럼 버튼 클릭시 박스가 1개 더 늘어나려면 count의 숫자가 1 증가하여야 한다. 즉 데이터를 업데이트 시켜줘야한다. 이때 사용하는게 바로 setState()이다.


- 함수형 컴포넌트에서 state관리 : 함수형 컴포넌트는 state가 없다. 하지만 react hooks를 사용하면 state를 가질 수 있다. 그 방법은 useState()이다.
```
const [count, setCount] = React.useState(3);
const addNemo = () => {
    setCount(count + 1);
  };
```
위와 같이 박스를 추가하는 과정에 대입해 본다면 count에 useState에 넣은 3을 state값으로 갖고 setCount를 통해서 +1씩 증가시켜서 state값을 변경할 수 있다.

## 요약
- state를 관리하는건 매우매우 중요한 부분이다. state를 관리하는 것도, 함수형 컴포넌트와 클래스형 컴포넌트를 만드는 순서또한 중요하다.
