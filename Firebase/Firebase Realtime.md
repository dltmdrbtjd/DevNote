# Firebase Realtime

## Firebase Realtime 이란?
- NoSQL 클라우드 데이터베이스로 데이터를 저장하고 동기화하는것. 모든 클라이언트에서 실시간으로 데이터가 동기화되고 앱,웹이 오프라인일 때도 데이터를 사용할 수 있다. Firebase 실시간 데이터베이스는 클라우드 호스팅 데이터베이스입니다. 데이터는 JSON으로 저장되며 연결된 모든 클라이언트에 실시간으로 동기화됩니다. iOS, Android, 자바스크립트 SDK로 크로스 플랫폼 앱을 빌드하면 모든 클라이언트가 하나의 실시간 데이터베이스 인스턴스를 공유하고 자동 업데이트로 최신 데이터를 수신합니다.


## 사용법
- firebase에서 auth 서비스를 활성화 시켜놨다는 전제하에 설명하겠다.
- 우선 현재 나의 파일과 연결시켜놓은 firebase.js 에서 firebase realtime을 추가해준다.
```javascript
// firebase.js

import firebase from "firebase/app";
import "firebase/database"; // realtime import하기!

const firebaseConfig ={ 사용자정보 }

firebase.initializeApp(firebaseConfig);

const realtime = firebase.database();

export { realtime } // 외부에서 사용하기위해 export시켜준다.
```

- 예를들어 redux를 사용중이라면 리덕스에서 realtime을 import 시켜준 후에 사용해주면 된다.
- 데이터 한 번 읽기
```javascript
const dbRef = firebase.database().ref();
dbRef.child("users").child(userId).get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
```

그 외의 다양한 사용법 보기 : https://firebase.google.com/docs/database/web/read-and-write?authuser=0#web-v8_3
