## computed 속성
- 템플릿 내에 표현식을 넣으면 편리하지만 너무 많은 연산을 템플릿 내에서 하면 코드가 비대해지고 유지보수하기 까다롭습니다. 그래서 복잡한 로직이라면 computed속성을 사용하는게 좋습니다.
```html
<div id="app">
  <p>원본 메시지: "{{ message }}"</p> <!-- 안녕하세요 -->
  <p>역순 메시지: "{{ reversedMessage }}</p> <!-- 요세하녕안 -->
</div>
```
```javascript
let vm = new Vue({
  el: '#app',
  data: {
    message: '안녕하세요'
  },
  computed: {
    // 계산된 getter
    reversedMessage: function() {
      return this.message.split('').reverse().join('')
    }
  }
})
```
- 위 예제는 computed속성인 reversedMessage를 선언하여 사용하였다. 작성한 함수는 vm.reversedMessage 속성에 대한 getter함수로 사용된다.
- 일반 속성처럼 computed속성에도 템플릿에서 데이터 바인딩 할 수 있다. Vue는 vm.reversedMessage가 vm.message에 의존하는 것을 알기 때문에 vm.message가 바뀔때 vm.reversedMessage에 의존하는 바인딩을 모두 업데이트한다. 그리고 중요한 포인트는 우리가 선언적으로 의존 관계를 만들었다는 점이다. computed속성의 getter함수는 사이드 이펙트가 없어 코드를 테스트하거나 이해하기 쉽다.
```javascript
console.log(vm.reversedMessage) // 요세하녕안
vm.message = 'Hello'
console.log(vm.reversedMessage) // olleH
```

## computed 속성의 캐싱 vs methods
- 위와 같은 예제를 물론 메소드를 호출하여 같은 결과를 얻는것도 가능하다.
```javascript
methods: {
  reversedMessage: function() {
    return this.message.split('').reverse().join('')
  }
}
```
- 최종 결과에 대해 2가지 접근 방식은 서로 동일하다. 다만 여기서 큰 차이점은 computed속성은 종속 대상을 따라 저장(캐싱)된다는 점이다. computed 속성은 해당 속성이 종속된 대상이 변경될 때만 함수를 실행시킨다. 즉 `message`가 변경되지 않는 한, computed 속성인 reversedMessage를 여러 번 요청해도 계산을 다시 하지 않고 계산되어 있던 결과를 즉시 반환한다. 이에 비해 메소드를 호출하면 렌더링을 다시 할 때마다 항상 함수를 실행한다. 여기서 캐싱이 주는 이점은 만약 시간이 많이 걸리는 computed 속성인 A가 있다면 이 속성을 계산하기 위해선 큰 배열을 반복해 다루고 많은 계산이 필요하다. 그런데 A에 의존하는 다른 computed 속성값도 존재할 수 있다. 캐싱을 하지 않으면 A의 getter함수를 꼭 필요한 것보다 더 많이 실행하게 된다.
- computed속성을 보면서 개인적으로 느꼈던 부분은 React의 useMemo() 훅이 생각났다. useMemo또한 연산된 값을 캐싱하여 가지고 있고 의존하는 값이 바뀔경우에만 연산을 다시하여 값을 다시 반환해주는데 이와 거의 유사한 맥락으로 느껴졌다.

## computed속성 vs watch속성
- Vue는 Vue 인스턴스의 데이터 변경을 관찰하고 이에 반응하는 보다 일반적인 watch속성을 제공한다. 하지만 명령적인 watch 콜백보다 computed 속성을 사용하는 것이 더 좋다고 공식문서에 작성되어 있다. ( watch 속성은 감시할 데이터를 지정하고 그 데이터가 바뀌면 이런 함수를 실행하려는 방식으로 소프트웨어 공학에서 이야가히나는 '명령형 프로그래밍'방식이고 computed속성은 계산해야 하는 목표 데이터를 정의하는 방식으로 '선언형 프로그래밍'방식이다. )
```html
<div id="app">{{ fullName }}</div>
```
```javascript
var vm = new Vue({
  el: '#app',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function(val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function(val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
```javascript
var vm = new Vue({
  el: '#app',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function() {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
위의 예시만 보아도 computed를 사용한 코드가 훨씬 좋아보인다. ( 일반적으로 선언형 프로그래밍이 명령형 프로그래밍보다 코드 반복이 적은등 우수하다고 평가하는 경향이 있다. )

## watch 속성
- 대부분의 경우 computed 속성이 더 적합하지만 사용자가 만든 감시자가 필요한 경우도 존재한다. 그래서 Vue는 watch 옵션을 통해 데이터 변경에 반응하는 보다 일반적인 방법을 제공한다. 이는 데이터 변경에 대한 응답으로 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우 가장 유용하다. 해당 코드 예제 : https://kr.vuejs.org/v2/guide/computed.html
