## Generator

### function *f(...)와 function *f(...)중 뭐가 맞을까 ?
- 둘 다 맞다. 그러나 *는 제너레이터 함수를 나타내므로 대게는 첫 번째 문법이 선호된다. *는 종류를 나타내는 것이지 이름을 나타내는 것이 아니기 때문이다. 그러므로 *는 function에 붙이는게 보편적이다.

## 요약
- 제너레이터는 제너레이터 함수 function* f(...) {...}을 사용해서 만든다.
- yield 연산자는 제너레이터 안에 있어야한다.
- next/yield 호출을 사용하면 외부 코드와 제너레이터 간에 결과를 교환할 수 있다.

제너레이터를 사용하면 실행중에도 제너레이터 호출 코드와 데이터를 교환할 수 있기 때문에 유용한 경우가 종종 있다. 그리고 제너레이터를 사용하면 이터러블 객체를 쉽게 만들 수 있다는 장점도 있다.

- 간단한 코드정리 : https://github.com/dltmdrbtjd/DevNote/blob/main/JavaScript/generator.js
- 출처 : https://ko.javascript.info/generators
