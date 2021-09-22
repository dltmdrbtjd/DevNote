// generator function
// ex.1 ( '제너레이터 함수'라는 특별한 문법 구조 function* 구조)
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// ex.2 ( next()는 제너레이터의 주요 메서드이다. )
// next()를 호출하면 가장 가까운 yield <value> 문을 만날 때까지 실행이 지속된다.
// yield<value> 문을 만나면 실행이 멈추고 산출하고자 하는 값인 value가 바깥 코드에 반환된다.
// next()는 항상 아래 두 프로퍼티를 가진 객체를 반환한다.
// value : 산출 값 , done : 함수 코드 실행이 끝났으면 true, 아니라면 false

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // { value: 1, done: false }
// 현재로서는 첫 번째 값만 받았으므로 함수 실행은 두 번째 줄에 멈춰있다.

let two = generator.next();

alert(JSON.stringify(two)); // { value: 2, done: false }
// 다음것을 호출하면 실행이 재개되고 다음 yield를 반환한다.

let three = generator.next();

alert(JSON.stringify(three)); // { value: 3 , done: ture }
// 또 호출하면 return문에 다다르고 함수가 종료되고 done은 true를 반환한다.
// 종료되었기 때문에 이 상태에서 next로 호출해도 아무 소용이 없다. 객체에 { done: true } 만 반환될 뿐이다.

// 제너레이터는 이터러블이다.
// 따라서 for.. of 반복문을 사용해서 값을 얻을 수 있다.

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for (let value of generator) {
  alert(value); // 1, 2가 출력된다.
}

// 주의할 점은 3은 출력이 되지 않는다.
// 이유는 for..of 이터레이션이 done: true일 때 마지막 value를 무시하기 때문이다.
// 그러므로 for..of를 사용했을때 모든 값이 출력되려면 yield로 값을 반환해야한다.

function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for (let value of generator) {
  alert(value); // 1,2,3
}

// 제너레이터는 이터러블 객체이므로 제너레이터도 스프레드 문법같은 관련 기능을 사용할 수 있다.

function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0,1,2,3

// generator.throw
// yield의 결과가 될 값을 제너레이터 안에 전달하기도 한다.
// 그런데 외부 코드가 에러를 만들거나 던질 수도 있다.
// yield 안으로 전달하려면 generator.thorw(err) 를 호출해야 한다.
// generator.thorw(err)를 호출하게 되면 err는 yield가 있는 줄로 던진다.
// ex. "2 + 2 = ?"

function* gen() {
  try {
    let result = yield '2 + 2 = ?'; // (1)

    alert(
      '위에서 에러가 던져졌기 때문에 실행 흐름은 여기까지 다다르지 못한다.'
    );
  } catch (e) {
    alert(e); // 에러 출력
  }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error('데이터베이스에서 답을 찾지 못했습니다.')); // (2)

// (2) 에서 제너레이터 안으로 던진 에러는 yield와 함께 라인 (1) 에서 예외를 만든다.
// 예외는 try..catch에서 잡히고, 관련 정보가 alert창에 출력된다.
// 제너레이터 안에서 예외를 처리하지 않았다면 예외는 여타 예외와 마찬가지로 제너레이터 호출 코드(외부 코드)로 떨어져 나온다.
// generator.thorw(라인 (2)) 에서 제너레이터를 호출하고 있으므로 아래와 같이 에러를 여기서 잡아도 된다.

function* generate() {
  let result = yield '2 + 2 = ?'; // 여기서 에러 발생
}

let generator = generate();

let question = generator.next().value;

try {
  generator.throw(new Error('데이터베이스에서 답을 찾지 못했습니다.'));
} catch (e) {
  alert(e); // 에러 출력
}

// 이렇게 제너레이터 바깥에서 에러를 잡지 못하면 에러는 제너레이터 호출 코드 바깥으로 떨어져 나간다.
// 여기서도 에러를 잡지 못하면 스크립트가 죽는다.
