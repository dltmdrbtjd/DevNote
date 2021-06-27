## JSX란?
- JSX란 간단히 말해 HTML 문법을 JavaScript 내부에서 쓴 것이다. 즉 JSX는 자바스크립트 안에서 HTML 문법을 사용해서 뷰를 구성할 수 있게 도와주는 자바스크립트 문법으로, 리액트 개발에 매우 중요한 요소중 하나이다.

### 예제
```
const start_half = <div>
                    <h1>안녕하세요!</h1>
                    <p>시작이 반이다!</p>
                  </div>;
```
위와 같이 작성하면 start_half 자체가 저 HTML태그들의 덩어리 그 자체이다.

- JSX의 규칙
1. 태그의 끝을 항상 닫아줘야한다.
2. 그리고 무조건 1개의 엘리먼트를 반환해야한다. return 안에 2개 이상의 엘리먼트를 반환할 수는 없다.
```
return (
    <p>JSX란 무엇인가?</p>

    <div className="App">
      <input type='text'/>
    </div>
  );
```
위와 같이 생성시 오류가 발생한다. 즉 return안에 첫 엘리먼트는 무조건 1개여야 한다. 물론 { } 로 감싸주면 저런식으로 작성할 수 있지만 규칙을 지키도록하자.
```
return (
    <div className="App">
      <p>JSX란 무엇인가?</p>
      <input type='text'/>
    </div>
  );
```
위와 같이 작성한게 올바른 예시이다.

3. JSX에서 JavaScript 값을 가져오는 방법
- 중괄호를 사용하면 간단하게 가져올 수 있다. 그리고 값을 가져올 떄 뿐만 아니라 map,삼향연산자 등 자바스크립트 문법을 JSX안에 쓸 때도 {}를 사용할 수 있다.
```
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const number = 1;

  return (
    <div className="App">
      <p>JSX란 무엇인가?</p>
      <p>{number > 10 ? number+'은 10보다 크다': number+'은 10보다 작다'}</p>
    </div>
  );
}

export default App;
```
위와 같이 number를 { } 로 가져옴과 동시에 삼향연산자로도 사용한 예시이다.

4. JSX에서는 원래 HTML에서의 class="클래스명" 방식으로 클래스명을 만들지않고 className="클래스명" 으로 사용한다. id는 그냥 id로 사용한다.
```
<div className="App">
</div>
```

5. 인라인으로 태그에 스타일을 주는 방식.
```
<p style={{color: 'orange', fontSize: '20px'}}>orange</p>
```
위와 같이 사용할 수도있고 아래와 같이도 사용할 수 있다.
```
const styles = {
    color: 'orange',
    fontSize: '20px'
  };
```
