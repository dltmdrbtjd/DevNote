# Firebase auth사용하기

## Firbase auth(인증) 이란?
- 우선 간단히 말하자면 계정관리 기능이다. 대부분의 웹,앱은 사용자의 신원 정보를 필요로 하는데 사용자의 신원을 알면 앱이나 웹이 사용자 데이터를 클라우드에 안전하게 저장할 수 있고 사용자의 모든 기기에서 개인에게 맞춘 동일한 경험을 제공할 수 있게 해준다. firebase auth는 앱,웹에서 사용자 인증 시 필요한 백엔드 서비스와 사용하기 쉬운 SDK,기성UI라이브러리를 제공한다. 비밀번호,전화번호, 인기ID제공업체(Goole,Facebook,Twitter 등)를 통한 인증이 지원된다.Firebase 인증은 여타 Firebase 서비스와 긴밀히 연동하고 OAuth 2.0 및 OpenID Connect 등의 업계 표준을 활용하므로 커스텀 백엔드와 쉽게 통합할 수 있다.

## 사용법
- firebase에서 auth 서비스를 활성화 시켜놨다는 전제하에 설명하겠다. 
- 우선 현재 나의 파일과 연결시켜놓은 firebase.js 에서 firebase auth를 추가해준다.

```javascript
// firebase.js

import firebase from "firebase/app";
import "firebase/auth"; // auth import하기!

const firebaseConfig ={ 사용자정보 }

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth } // 외부에서 사용하기위해 export시켜준다.
```
- 예를들어 redux를 사용중이라면 리덕스에서 auth를 import 시켜준 후에 사용해주면 된다.

- 신규 사용자 가입 : 신규 사용자가 자신의 이메일 주소와 비밀번호를 사용해 앱에 가입할 수 있는 양식을 만든다. 사용자가 양식을 작성하면 사용자가 입력한 이메일 주소와 비밀번호의 유효성을 검사한 후 createUserWithEmailAndPassword 메서드에 전달한다.
```javascript
import { auth } from "firebase"; 

auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
```

- 기존 사용자 로그인 : 기존 사용자가 자신의 이메일 주소와 비밀번호를 사용해 로그인 할 수 있는 양식을 만든다. 사용자가 양식을 작성하면 signInWithEmailAndPassword 메서드를 호출한다.
```javascript
import { auth } from "firebase"; 

auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
```

- 위의 예제도 공식사이트에 있는 방법이고 다양한 사용법은 공식사이트에 있는 문서를 보면서 사용하면 된다.
- 링크 : https://firebase.google.com/docs/auth/web/start?authuser=0
