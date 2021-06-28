## 라우팅이란 ?
- 우선 Route내용을 적기에 앞서 SPA란 개념을 알아야 이걸 왜 쓰는지 알 수 있다. SPA는 Single Page Application의 약자인데 말 그대로 서버에서 주는 html이 1개뿐인 어플리케이션이다. 이렇게 html을 하나만 가지고 있어도 브라우저 주소에 따라 다른 페이지를 보여주는걸 라우팅이라고 부른다. 라이브러리를 사용하면 된다!

```
yarn add react-router-dom
```
위는 라우터의 설치방법이다.
- 우선은 기본적으로 index.js에서 BrowserRouter를 적용시켜주고 App.js에 Route를 적용하고 시작한다.

```javascript
<div className="App">
  <Route path="/" component={Home} />
  <Route path="/sub1" component={sub1} />
  <Route path="/sub2" component={sub2} />
</div>
```
이런 식으로 라우터를 연결후 App.js내부에 컴포넌트들에 Route를 이용해서 다른 컴포넌트들을 넣고 path를 통한 그 주솟값으로 이동하는 방식이다.
그리고 path="/sub1/:sub-title" 이런식으로 url 파라미터를 사용할 수도 있다. 또 한 잘못된 주소를 처리하기 위해선 Switch를 추가해주고 그 안에 path없이 Route를 사용해서 잘못 주소를 들어왔을시에 보여줄 컴포넌트를 넣어주면된다.
```javascript
<div className="App">
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/sub1" component={sub1} />
    <Route path="/sub2" component={sub2} />
    <Route component={NotFound} />
  </Switch>
</div>
```
위와 같은 방식으로 처리하면 잘못된 주소를 처리할 수 있다.
