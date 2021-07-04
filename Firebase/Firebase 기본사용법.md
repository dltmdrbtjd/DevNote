# Firebase
- firebase는 서버리스로 우리의 서비스를 사용할 수 있게해주는 플랫폼이다. 여기서 서버리스란 서버가 없다는것이 아니고 서버를 신경쓸 필요가 없다는 것이다. 이미 누군가가 구축해둔 서버의 일부분을 빌려쓰기 때문에 사용자는 사용자가 필요한 서버를 필요한만큼만 빌려 쓰면 된다고 생각하면된다.

## Firestore
- Firestore는 일명 realtime-database를 제공하는 서비스이다. 실시간으로 데이터가 추가되고, 삭제되는 걸 우리 클라이언트에게 알려준다. 리액트와는 react-firebase라는 패키지를 통해 편리하게 연결하여 사용할 수 있다. ( 사용하는 방법은 공식사이트 및 구글을 통해 검색하면 나온다. )
```
yarn add firebase
```
### 리액트와 Firebase 연동하는 방법
- 우선 위 패키지를 설치해준다. 그리고 firebase페이지에서 config를 가지고 와야한다. 우선 사용전 firebase.js로 파일을 만들어준다. 그 후 App.js에서 firebase.js에서 내보낸 firestore를 가져온다. 

```javascript
//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const store = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { store };
```
위와 같이 만든후에 필요한 파일에 연결시켜준다.
```javascript
import { store } from "./firebase";
```


### 데이터 추가,수정,삭제
```javascript
# 데이터 추가하기. 콜렉션을 찾은후 -> add 
bucket.add({ text: "수영 배우기", compeleted: false });

# 데이터 수정하기, 콜렉션을 찾고 -> 도큐먼트id로 set
bucket.doc("bucket_item").update({ text: "수영 배우기", compeleted: false });

#데이터 삭제하기, 콜렉션을 찾고 -> 도큐먼트id로 delete
bucket.doc("bucket_item").delete([도큐먼트 ID]);
``` 

### 콜렉션의 이름 변경해서 추가하는법
```javascript
const bucket = firestore.collection("buckets");
bucket.doc("bucket_item").set({ text: "수영 배우기", compeleted: false });
```
