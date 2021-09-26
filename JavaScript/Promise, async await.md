## Promise
- Promise는 자바스크립트에서 비동기 처리에 사용되는 객체이다. 내용은 실행 되었지만 결과를 아직 반환되지 않은 객체라고 이해하면 쉽다. Promise에는 3가지 상태가 있는데 Pending(대기), Fulfilled(이행), Rejected(실패)가 있다. 비동기 처리가 완료 되지 않았다면 Pending, 완료 되었다면 Fulfilled, 실패하거나 오류가 발생하면 Rejected상태를 갖는다.

### Promise 사용 예시
```javascript
const result = true;
const promise = new Promise((resolve, reject) => {
  if(result) {
    resolve('resolved')
  } else {
    reject('rejected')
  }
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```
result값에 따라 promise의 반환 값이 결정 되고 있다. 값이 참이면 resolve를 호출하고, 아닐시에는 reject를 호출한다. resolve한 반환값에 대해서는 then()을 통해 결과 값을 반환 받을 수 있고 reject의 반환 값에 대해서는 catch()를 통해 반환 받는다. then()과 catch()문의 체이닝을 통해 비동기 로직의 성공 여부에 따른 분기 처리가 가능하다.

## async / await
- 가장 최근에 나온 비동기 처리 문법으로 기존의 callback이나 Promise의 단점을 해소하고자 만들어졌다. callback이나 Promise의 경우에 단점은 꼬리에 꼬리를 무는 코드가 나올수도 있는 부분이다. 흔히들 콜백지옥, then()지옥이라고 부른다. await을 통해 Promise반환 값을 받아 올 수 있다.
```javascript
const variable = await promise;
// promise의 반환 값을 받아 variable
```
하지만 async/await을 사용하기 위해서는 선행되어야 하는 조건이 있는데, await은 async함수 안에서만 동작한다.
```javascript
(async() => {
  const result = true;
  const promise = new Promise((resolve, reject) => {
    if(result) {
      resolve('resolved');
    } else {
      reject('rejected');
    }
  });
  
  try {
    const result = await promise;
  } catch (err) {
    console.error(err)
  }
})();
```

## 차이점
### 에러 핸들링
- Promise를 활용할 시에는 .catch() 문을 통해 에러핸들링이 가능하지만, async/await은 에러 핸들링 할 수 있는 기능이 없어서 try-catch()문을 활용해야한다.
### 코드 가독성
- Promise의 .then() 지옥의 가능성
- 코드가 길어지면 길어질수록 async/await를 활용한 코드가 가독성이 좋다.
- async/await은 비동기 코드가 동기 코드처럼 읽히게 해주기 때문에 코드 흐름을 이해하기 쉽다.
