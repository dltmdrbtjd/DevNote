## Closure
- 클로저(Closure)는 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성이다. 다양한 문헌에 모두 각각의 클로저를 다르게 정의 또는 설명하고 있다.
  - 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수 - 더글락스 크록포드
  - 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것 - 에단 브라운
  - 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수 - 존 레식
  - 이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수 - 송형주,고현준
  - 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합 - 에릭 프리먼
  - 로컬 변수를 참조하고 있는 함수 내의 함수 - 야마다 요시히로
  - 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수 - 유인동
  - 등등...
- 이렇게 각기 다른 정의가 있기 때문에 딱 하나다 라고 정의하기엔 난감하지만 내가 이해한 내용은 "어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상" 정도로 이해를 할 수 있었다. 그리고 추가적으로 오늘 책에서 읽어본 정의는 <strong>"클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상"</strong>으로 정의 되어있고 위 예시중 존 레식,송형주 고현준, 유인동 저자분들의 세 표현이 클로저의 정의에 가장 근접하다고 명시되어 있었다.
```javascript
// 외부 함수의 변수를 참조하는 내부 함수(1)
var outer = function() {
  var a = 1;
  var inner = function() {
    console.log(++a);
  };
  inner();
}
outer();
```

```javascript
// 외부 함수의 변수를 참조하는 내부 함수(2)
var outer = function() {
  var a = 1;
  var inner = function() {
    return ++a;
  };
  return inner();
}
var outer2 = outer();
console.log(outer2); // 2
```

```javascript
// 외부 함수의 변수를 참조하는 내부 함수(1)
var outer = function() {
  var a = 1;
  var inner = function() {
    return ++a;
  };
  return inner;
}
var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

## 클로저는 어떤경우에 사용하면 좋을까 ?
- 만약 let a = 1; 이라는 변수를 a라는 변수는 plusNum이라는 함수를 이용해서만 값을 변경하고 싶다고 가정해보자. 그런데 엄청 많은 코드에 중간에 누군가 a라는 변수를 100이라는 값으로 변경하게되면 추후에 사용할 plusNum이라는 함수를 이용해서 값을 변경하면 100에 대한 값에 변경이 발생하게 되므로 생각했던 값을 얻을수 없게된다. 그럴때 이 변수에 접근을 못하게 하기위해서 클로저를 사용하면 된다. 전역변수인 a를 지역변수로 변경해주면 된다. 이 방법을 클로저를 통한 예제로 살펴보자.
```javascript
function closure() {
  let cnt = 0;
  
  function cntPlus() {
    cnt = cnt + 1;
  }
  function setCnt(value) {
    cnt = value;
  }
  function printCnt() {
    console.log(cnt);
  }
  return {
    cntPlus,
    setCnt,
    printCnt,
  }
}

const cntClosure = closure();
console.log(cntClosure); // { cntPlus: [Function: cntPlus], setCnt: [Function: setCnt], printCnt: [Function: printCnt] }
cntClosure.printCnt(); // 0
cntClosure.cntPlus(); 
cntClosure.printCnt(); // 1
cntClosure.setCnt(100);
cntClosure.printCnt(); // 100
```
- 이런식으로 클로저함수에 접근하여 변수를 바꿔가며 사용하면 앞서말했던 문제를 해결하며 변수를 사용할 수 있다.
- 해당 예제코드 및 설명방식은 유튜브 라매개발자님의 영상을 참고해서 만들었다. 출처 : https://www.youtube.com/watch?v=LL0DGc5pg7A
