## Event Loop
- MDN 정의 : 자바스크립트는 이벤트 루프에 기반한 동시성 모델이라고 한다. 이벤트 루프는 코드 실행,이벤트 수집,이벤트 처리, 큐에 놓인 하위 task실행을 담당한다.
- javascript.ifno 정의 : 이벤트 루프 정의는 아주 간단합니다. 이벤트 루프는 태스크가 들어오길 기다렸다가 태스크가 들어오면 이를 처리하고, 처리할 태스크가 없는 경우에 잠드는, 끊임없이 돌아가는 자바스크립트 내 루프입니다.(task는 '작업'이라고 번역할 수 있는데, 매크로-마이크로 태스크 등의 용어와 일치시키기 위해 '태스크'라고 음차 번역하였습니다 - 옮긴이).

## 단일 스레드
- 자바스크립트는 우선 단일 스레드 기반의 언어입니다. 한 순간 하나의 작업만을 처리할 수 있다. 하지만 자바스크립트는 비동기로 동작하기 때문에 단일 스레드에도 불구하고 동시에 많은 작업을 수행한다. 그러나 언어 자체가 비동기 동작을 지원하는것은 아니다. 비동기로 동작하는 핵심요소는 자바스크립트 언어가 아닌 브라우저가 가지고있다. (Node에서는 libuv 라이브러리 등) 브라우저는 Web APIs, Event table, Callback Queue, Event Loop등으로 구성되어 있다.
<p align="center">
  <img src="https://miro.medium.com/max/1050/1*pjRSYsfW-D8MCrGh9LS_4Q.png" />
</p>

### 스레드
- 프로세스가 할당받은 자원을 이용하는 실행의 단위
- 한 프로세스 내에서 동작되는 여러 실행 흐름으로 프로세스 내의 Heap, Data, Code 영역을 공유
- 하나의 프로세스를 다수의 실행 단위인 스레드로 구분하여, 자원을 공유하고 자원의 생성과 관리의 중복성을 최소화하여 수행 능력을 향상시키는 것을 멀티 스레딩이라고 함, 이 경우 각각의 스레드는 독립적인 작업을 수행해야 하기 때문에 각자의 스택과 PC레지스터 값을 가지고 있음.
<p align="center">
  <img src="https://media.vlpt.us/images/eunjin/post/c63d6950-7ae7-439a-9ee8-d6f145d6808a/Screen%20Shot%202021-01-17%20at%204.18.53%20PM.png" />
</p>

## 그래서 결국 이벤트 루프의 역할은 무엇인가?
- Event루프의 역할은 Call Stack과 Callback Queue를 감시한다. Call Stack이 비어있을 경우, Callback Queue에서 함수를 꺼내 Call Stack에 추가한다.
```javascript
console.log('hello world!');

setTimeout(function test() {
  console.log('I`m Lee');
}, 1000); // 1초 뒤 실행

console.log('bye bye');
```
### 위 코드가 어떻게 동작하는지 순서대로 살펴보자
1. console.log('hello world')가 Call Stack(콜 스택)에 추가(push)된다.
2. console.log('hello world')가 실행되어 화면에 출력한 뒤에 Call Stack에서 제거(pop)된다.
3. setTimeout(function test(){...})이 Call Stack에 추가된다.
4. setTimeout 함수가 실행되면서 Browser가 제공하는 timer Web API를 호출하고 그 후 Call Stack에서 제거된다. ( Web APIs에 담긴다. )
5. console.log('bye bye')가 Call Stack에 추가된다.
6. console.log('bye bye')가 실행되어 화면에 출력되고 Call Stack에서 제거된다.
7. setTimeout 함수가 전달한 시간뒤 Callback으로 전달한 test함수가 Callback Queue에 추가된다.
8. 이벤트 루프는 Call Stack이 비어있는 것을 확인하고 Callback Queue를 살펴보고 test를 발견한 이벤트 루프가 Call Stack에 test를 추가한다.
9. test함수가 실행 되고 내부의 console.log('Im Lee')가 Call Stack에 추가된다. ( test함수 위에 쌓이는 형태로 상상하면 된다. )
10. console.log('Im Lee')가 화면에 출력되고 Call Stack에서 제거된다. ( stack형태의 구조이기 때문에 마지막에 후입선출 방식이다. 그래서 console.log가 먼저 제거된다.)
11. test함수가 Call Stack에서 제거된다.

- 위와 같은 방식으로 Javascript와 Browser의 구성요소들이 동작한다고 생각하면 된다.

## 이벤트 버블링이란 무엇인가 ?
- 특정 화면 요소에서 이벤트가 발생했을때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미한다.
- 상위의 화면 요소 : HTML 요소는 기본적으로 트리 구조를 갖는데 여기서는 트리 구조상으로 한 단계 위에있는 요소를 상위 요소라고 하고 body태그를 최상위라고 생각하면 된다.

```javascript
<body>
  <div class="section-01">
    <div class="section-02">
      <div class="section-03">
      </div>
    </div>
  </div>
</body>
```
```javascript
  let Section = document.querySelctorAll('div');
  Section.forEach(function(item) {
    item.addEventListener('click', log);
  });
  
  function log(e) {
    console.log(e.currentTarget.className);
  }
```
- 위 코드는 3개의 div tag에 모두 클릭 이벤트를 등록하고 클릭시 log함수를 실행시킨다. 여기서 최하위 div를 클릭하면 section-03 -> section-02 -> section-01 순으로 실행된다.
- div tag 1개만 클릭했는데 3개의 이벤트가 발생하는데 그 이유는 브라우저가 이벤트를 감지하는 방식 때문이다. 브라우저는 특정 화면 요소에서 이벤트가 발생했을때 그 이벤트를 최상위에 있는 화면 요소까지 이벤트를 전파시킨다. 따라서, 위 예제에서 클래스명 순서로 div에 등록된 이벤트들이 실행되는 것이다. 
- 여기서 주의할 점은 각 태그마다 이벤트가 등록되어 있기 때문에 상위 요소로 이벤트가 전달되는 것을 볼 수 있다. 만약 이벤트가 특정 div 태그에만 달려 있다면 위와 같은 동작은 발생하지 않는다. 이와 같은 하위에서 상위 요소로의 이벤트 전파 방식을 이벤트 버블링이라고 한다.
