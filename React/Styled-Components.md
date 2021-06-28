## Styled-components 란?
- 컴포넌트 스타일링 기법 중 1개로 가장 많이 사용하는 방식중 1개이다. 그 이유는 크게 꼽자면 class이름 짓기에 대해서 고민할 시간을 많이 줄일수있고, 컴포넌트에 스타일을 적기 때문에 매우 간단하고 직관적으로 사용할 수 있기 때문이다. CSS-in-JS 라이브러리 중 1개인 방식인데 컴포넌트에 스타일을 직접 입히는 방식이라고 생각하면 편하다.

- 패키지 설치
```
yarn add styled-components
```

- Styled-components를 적용하고 사용하는 방식
```javascript
import React from 'react';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <MyStyled bgColor={"red"}>hello React!</MyStyled>
    </div>
  );
}

const MyStyled = styled.div`
  width: 50vw;
  min-height: 150px;
  padding: 10px;
  border-radius: 15px;
  color: #fff;
  &:hover{
    background-color: #ddd;
  }
  background-color: ${(props) => (props.bgColor ? "red" : "purple")};
`;
export default App;
```

위와 같이 styled-componets를 우선 import시켜주고 사용해야한다. 또한 props를 사용할 수도 있고 SCSS처럼 자기 자신을 지칭할 떄 &를 사용할 수도 있다. 사용하는 방식은 매우 간단하다. 원하는 변수명으로 선언 해주고 styeld.[원하는 태그명] 후에 백틱 2개를사용하여 그안에 스타일을 채워주는 방식으로 사용하면된다. 그 후에 위와 같은 방식으로 컴포넌트 안에서 사용하면 된다.
