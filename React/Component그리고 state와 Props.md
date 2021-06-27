## Component란 무엇인가?
- 컴포넌트는 리액트에서 가장 중요한 요소이다. 그 이유는 리액트로 만들어진 앱을 이루는 최소한의 단위가 컴포넌트이기 때문이다. 쉽게 말하자면 컴포넌트들은 하나하나의 블록들이라고 생각하고 이 블록들을 잘 쌓아 올리는 과정이 리액트를 쓰는과정이라고 생각하면 된다. 그리고 이 작은 컴포넌트들을 유기적으로 잘 연결시키고 동작이 잘될시에 리액트를 잘 다루고있다고 표현할 수 있다. 그리고 컴포넌트는 클래스형 컴포넌트와 함수형 컴포넌트가 있는데 공식사이트 에서는 함수형 컴포넌트를 권장한다.

1. HTML을 사용하다보면 header, container, footer 등등으로 나누다보면 코드가 상당히 길어지게 된다. 그것들을 하나하나 컴포넌트들로 나누어서 사용하면 매우 깔끔하게 사용가능하다.

```
<div className="App">
  <header />
  <container />
  <footer />
</div>
```

이런식으로 1개 1개의 컴포넌트들로 나누어서 사용할 수 있다

## State와 Props란?
- 컴포넌트들은 데이터를 어떤식으로 관리할까? 방법은 state와 props를 이용해서 데이터를 사용한다. 우선 state는 컴포넌트가 가지고 있는 데이터이다. 즉 자기자신이 가지고 있는 데이터라고 이해하면 쉽다. 그리고 Props는 컴포넌트가 부모 컴포넌트로 부터 받아온 데이터이다. 예를 들어 < header /> 에서 사용한 데이터인 로고 이미지 경로나 메뉴 이름들은 다른 컴포넌트들에서는 사용하지 않는다. 즉 헤더 컴포넌트 내에서만 쓰는 정보인 셈이다. 여기서 알 수 있는건 state는 한 컴포넌트에서만 사용하는 정보를 주로 넣어놓고 생성,수정하는 데이터이다. 생성과 수정도 오직 해당 컴포넌트 내에서만 이루어진다.

- Props는 부모 컴포넌트로 부터 받아온 데이터라는데 무슨말일까? 아래 예시 코드를 살펴보자
```
<container>
	<imagebanner/>
	<contents1/>
</container>
```
위와 같은 형태의 컴포넌트들이 있다고 가정해보자. container는 두 개의 자식 컴포넌트를 가지고 있다. imgaebannr에 필요한 이미지 경로 데이터를 부모인 container가 가지고 있다고 가정하면(state로) 이 때 imagebanner 컴포넌트는 자신의 부모인 container로 붙어 데이터를 받아서 사용한다. 여기서 container가 가지고 있는 이미지 경로를 imagebanner에 전달해주면 이 이미지 경로가 imagebanner의 props가 되는것이다. 즉 앞서 말한것처럼 부모 컴포넌트로 부터 전달 받은 데이터를 Props라고 한다. 그리고 Props는 자기 자신의 데이터가 아니기 때문에 수정할 수 없다.

## 함수형 Component란?
```
import React from 'react'; 

function Bucketlist(props){
    return (
        <div>버킷 리스트</div>
    );
}

const BucketList = (props) => {
    return (
        <div>
            버킷 리스트
        </div>
    );
}
export default BucketList; # 외부로 보내주기위한 코드
```

함수형 컴포넌트는 위와 같이 2가지의 방식으로 사용할 수 있는데 보통 밑에 방식으로 사용하는걸 더 선호한다. export default BucketList는 이 컴포넌트를 외부로 보내주기 위해서 사용한 코드이다.
그 후에 App.js로 돌아가서 BucketList 컴포넌트를 import시켜주고 사용하면 된다.
```
import React from 'react';
import BucketList from './BucketList'; ## 이렇게 우리가 사용할 컴포넌트를 import시켜주고 사용한다.

function App() {

  return (
    <div className="App">
      <h1>내 버킷리스트</h1>
      <BucketList/> ## 여기로 불러왔다.
    </div>
  );
}

export default App;
```

## 클래스형 Component란?
```
import React from 'react';
import logo from './logo.svg';
import './App.css';
import BucketList from './BucketList';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: ['영화관 가기', '매일 책읽기', '수영 배우기'],
    };
  }

  render() {
      return (
      <div className="App">
        <h1>내 버킷리스트</h1>
        <BucketList list={this.state.list}/>
      </div>
    );
  }
}

export default App;
```
위와 같은 형식이 클래스형 컴포넌트의 방식이다. 이제 컴포넌트에서 컴포넌트로 데이터를 넘겨주는 방식을 알아보도록하자 앞서 counstructor 부분에 있는 데이터를 BucketList로 state를 넘겨준다고 생각하면 된다. BucketList 컴포넌트 안에 list란 이름으로 데이터를 전달해준게 지금 BucketList에 데이터를 넘겨준것이라고 보면된다. 그 후에 BucketList에서 함수형 컴포넌트 생성시 파라미터 안에 props를 받아서 cosnole.log(props)로 찍어보면 확인할 수 있다.

