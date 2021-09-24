## 상황에 따라 다른 this 바인딩

## this
- this는 Object를 참조하는 keyword이다. javascript는 함수 호출 방식에 따라서 this가 참조하는 객체가 달라진다.
- web에서의 this : web에서 전역 객체는 window이다. console창에 this를 치면 window객체가 나온다.
- node에서의 this : 그냥 this를 출력하면 {} 처럼 빈객체가 출력된다. window가 아닌 빈 객체가 나오는 이유는 web과 노드는 다른 런타임이기 때문에 dom관련된 객체는 없다. 실제 Node에서의 this는 modeul.exports이다. 파일을 모듈로 사용할 수 있게 해주는 객체이다. 즉 this,exports,module.exports는 모두 같다. 흔히 우리가 아는 this가 global객체로 바인딩 되는 경우는 따로 있다. this는 함수를 어떻게 선언했는지, 어디서 활용되었는지에 따라서 동적으로 혹은 정적으로 정해진다.
```javascript
console.log(this === global); //false
console.log(this === module.exports, this === exports); // true, true

function a() {
  console.log(this); // Object[global]
  console.log(this === exports); // fase;
}
```

## 함수 호출에 따른 this 바인딩
- 자바스크립트는 함수 호출 방식에 의해 this에 바인딩될 객체가 결정된다. 함수 실행 컨텍스트에서는 this는 함수가 어떻게 호출되었느냐에 집중해서 파악하면 된다.
```javascript
const person = {
  name: 'Lee',
  sayHello: function() {
    console.log('hello', this.name)
  }
}
person.sayHello() // hello Lee
const callMyName = person.sayHello
callMyName() // hello
```
## 함수 선언식
- 함수 선언식 안에서 this는 global객체를 의미한다. 함수선언식은 함수가 호출,실행 될 때 this가 동적으로 결정된다. 이런 이유 때문인지 함수 선언식이 내부함수에서 선언될 경우 ( 콜백함수, 내부함수의 내부함수)는 항상 global,window 처럼 전역객체에 바인딩된다.
- 이런 방법을 해결하기 위한 방법
  - this를 사용하려는 객체에서 사전에 변수를 선언해서 사용한다.
  - apply, call, bind 메소드 사용해서 this를 바인딩 한다.
```javascript
const obj = {
  name: 'Lee',
  getName: function() {
    console.log(this); // obj
    const that = this;
    setTimeout( function () {
      console.log(this); // window
      console.log(that); // obj
    });
  },
};
```
## arrow function
- arrow function은 this 바인딩할 객체가 선언할 때 정적으로 결정된다. 즉, 언제나 상위 스코프의 this를 가르킨다. 이를 Lexical this라 한다. 위 함수 선언식과 같은 예제이지만 내부함수임에도 화살표 함수는 상위 스코프의 this를 가르키고있다. 여기서 상위 스코프는 getName 메소드이다.
- 화살표 함수는 콜백함수에서 this를 사용할때 헷갈리지 않게 사용할 수 있다.
```javascript
const obj = {
  name: 'Lee',
  getName: function() {
    console.log(this); // obj
    (() => {
      console.log(this); // obj
    })();
  },
};
```

## apply, call,  bind
- function.prototype 객체의 메소드인 apply, call, bind를 통해서 this를 특정 객체에 명시적으로 바인딩 할 수 있다. apply,call 메소드에 this를 입력하는 자리에 null을 입력하면 apply,call이 실행된 함수 인스턴스는 전역객체에 바인딩 돼 실행된다고 생각하면 된다.

### apply 
```javascript
func.apply(thisArg, [argsArray])
```
- apply는 함수를 호출하는 함수이다. 주로 유사 배열 객체들을 객체 메소드를 활용할 때 사용된다.

### call
```javascript
func.call(thisArg[, arg1[, arg2[, ...]]])
```
- call은 apply와 하는 역할은 같다. 하지만 apply와 문법이 다른데 apply는 array로 실행시킬 함수의 arguments를 받는 반면 call은 인자를 하나하나 받는다.

### bind
- bind는 apply,call과 다르게 함수를 리턴하고 호출하지는 않는다.
```javascript
  const obj = {
    name: 'Lee',
    sayHello: function () {
      console.log(this.name);
    },
  };
  
  const obj2 = {
    name: 'Gyu',
  };
  
  obj.sayHello(); // Lee
  obj.sayHello.call(obj2) // Gyu
  obj.sayHello.bind(obj2)() // Gyu
  // bind는 함수를 리턴하기 때문에 호출을 따로 해주어야 한다.
```

## addEventListner 사용시 콜백함수의 this
- addEventListner를 사용해서 콜백 함수를 호출할 때 콜백함수는 addEventListner를 호출하는 즉, 트리거가 되는 객체가 this로 바인딩 되어 들어간다. 이러한 현상은 혼동을 주기 쉽다. 2가지의 해결 방안이 잇다.
  - 콜백함수를 화살표함수로 작성하기
  - bind로 this바인딩하기

```javascript
class Event {
  init() {
    div.addEventListner("click", this.sayThis);
    div.addEventListner("click", this.sayThat);
    div.addEventListner("click", this.useBind.bind(this));
  }
  
  sayThis() {
    console.log("함수 선언식", this) // div
  }
  
  sayThat = () => {
    console.log("화살표 함수", this) // Event
  }
  
  sayBind() {
    console.log("함수 선언식 with bind", this) // Event
  }
}
```
- 하지만 화살표 함수를 사용시 문제가 있다. Event의 prototype property가 가르키는 객체에 화살표 함수로 선언된 sayThat은 포함되지 않는다. 이는 상속한 뒤 override하고 싶을 때 번거로움을 유발한다.

## setTimeout
- setTimeout과 같은 웹(브라우저)에서만 사용가능한 메소드들은 window에 this가 자동으로 바인딩 된다. 그렇기 때문에 class의 메소드에서 활용할 경우 위의 addEventListner처럼 bind 또는 함수 표현식으로 작성해야 한다.

## 결론
- this가 바인딩 되는 경우를 공부하면서 해당 아래 blog 내용을 직접 써내려가면서 정리해보았다. 일부는 작성하지 않은 부분도 있지만 감을 잡게된 것 같아서 엄청 유익했다 !
- 출처 : https://velog.io/@proshy/JS-%EC%83%81%ED%99%A9%EC%97%90-%EB%94%B0%EB%A5%B8-this-%EB%B0%94%EC%9D%B8%EB%94%A9








