## Vue.js가 무엇인가 ?
- Vue는 사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크이다. 다른 단일형 프레임워크와 달리 Vue는 점진적으로 채택할 수 있도록 설계되었다. 핵심 라이브러리는 뷰 레이어만 초점을 맞추어 다른 라이브러리나 기존 프로젝트와의 통합이 매우 쉽다. 그리고 Vue는 <a href="https://kr.vuejs.org/v2/guide/single-file-components.html">현대적 도구</a> 및 <a href="https://github.com/vuejs/awesome-vue#components--libraries">지원하는 라이브러리들</a>과 함께 사용한다면 정교한 단일 페이지 응용프로그램을 완벽하게 지원할 수 있다.

## 시작하기
- 참고 문서 : https://cli.vuejs.org/
- install
```
npm install -g @vue/cli
# or
yarn global add @vue/cli
```
- Create a Project
```
vue create project-name
# or
vue ui
```

## 선언적 렌더링
- Vue.js의 핵심은 간단한 템플릿 구문을 사용하여 DOM에서 데이터를 선언적으로 렌더링 할 수 있는 시스템이 있다.
```javascript
let app = new Vue({
  el: "#app",
  data: {
    message: "Hello World !"
  }
})
```
```html
<div id="app">
  {{ message }}
</div>
```
- 이런식으로 작성하면 화면에 Hello World! 가 출력된다.

## 조건문
- 엘리먼트가 표시되는지에 대한 여부를 제어하는건 아주 간단하다. 아래는 조건문의 예시이다.
- 만약 app.seen = false 를 입력하면 메시지가 사라지게 된다.
```javascript
let app = new Vue({
  el: "#app",
  data: {
      seen: true,
  }
})
```
```html
<div id="app">
  <p v-if="seen">제가 화면에 나오나요?</p>
</div>
```
## 반복문
- vue는 몇가지 디렉티브가 존재한다. 각 디렉티브마다 고유한 기능이 있다. 그 중 v-for 디렉티브는 배열의 데이터를 바인딩하여 Todo목록을 표시하는데 사용할 수 있다. 아래는 예제이다.
- 브라우저 콘솔창에 app.todos.push({ text: '예제 추가하기' }}를 입력하면 동적으로 추가되는 모습을 확인할 수 있다.
```javascript
let app = new Vue({
  el: "#app",
  data: {
    todos: [
      { text: 'Vue 기본 지식 공부' },
      { text: '간단한 예제들 만들어보기' },
      { text: '공식문서 최대한 꼼꼼히 읽어보기' }
    ]
  }
})
```
```html
<div id="app">
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
</div>
```

## 사용자 입력 핸들링
- 사용자가 앱과 상호 작용할 수 있게 하기 위해서 v-on 디렉티브를 사용하여 Vue 인스턴스에서 메소드를 호출하는 이벤트 리스너를 추가 할 수 있다.
- 아래 예제는 인스턴스에 메소드를 생성하여 사용하는 방식의 코드이다.
```javascript
let app = new Vue({
  el: "#app",
  data: {
    message: "Hello World"
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```
```html
<div id="app">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">메시지 뒤집기</button>
</div>
```
- 아래 방법은 DOM을 직접적으로 건드리지 않고 앱의 상태만을 업데이트한다. 모든 DOM조작은 Vue에 의해 처리되며 작성한 코드는 기본 로직에만 초점을 맞춥니다.
- Vue는 또한 양식에 대한 입력과 앱 상태를 양방향으로 바인딩하는 v-model 디렉티브를 제공한다.
- input에 value가 기본적으로 인스턴스의 message가 입력된 상태이고 input에 다른 텍스트를 입력하면 p태그의 내용 즉 인스턴스의 message도 함께 바뀐다.
```javascript
let app = new Vue({
  el: "#app",
  data: {
    message: 'Hello World'
  }
})
```
```html
<div id="app">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

## 컴포넌트를 사용한 작성법
- 컴포넌트 시스템은 Vue의 또 다른 중요한 개념이다.. 이는 작고 독립적이며 재사용할 수 있는 컴포넌트로 구성된 대규모 애플리케이션을 구축할 수 있게 해주는 추상적 개념이다. 생각해보면 거의 모든 유형의 애플리케이션 인터페이스를 컴포넌트 트리로 추상화할 수 있다.
- Vue에서 컴포넌트는 미리 정의된 옵션을 가진 Vue 인스턴스 입니다. Vue에서 컴포넌트를 등록하는 방법은 간단하다.
```javascript
// todo-item의 이름을 가진 컴포넌트 생성
Vue.component('todo-item', {
  // todo-item 컴포넌트는 'prop'이라고하는 사용자 정의 속성 같은 것을 입력받을 수 있다.
  // prop은 todo라는 이름으로 정의했다.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

let app = new Vue({
  el: "#app",
  data: {
    til: [
      { id: 0, text: 'Vue' },
      { id: 1, text: 'JS' },
      { id: 2, text: 'TS' }
    ]
  }
})
```
```html
<div id="app">
  <ul>
    <! --
    이제 각 todo-item에 todo 객체를 제공
    화면에 나오고, 각 항목의 컨텐츠는 동적으로 변경가능
    또한 각 구성 요소에 "키"를 제공해야함 ( React와 같은 개념인것 같다 ? )
    -- >
    <todo-item
      v-for="item in til"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ul>
</div>
```

- 모든 참고 자료 : https://kr.vuejs.org/v2/guide/index.html
