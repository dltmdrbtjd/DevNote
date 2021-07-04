# Firebase Storage
- Firebase Storage : FirebaseStorage는 일종의 문서,사진,파일,동영상 등을 저장하는 저장소라고 생각하면 된다. Google의 규모를 활용한 강력하고 단순하며 경제적인 객체 저장소 서비스이다. Cloud Storage용 Firebase SDK는 네트워크 품질과 관계없이 Firebase 앱의 파일 업로드 및 다운로드에 Google 보안을 적용합니다. 이 SDK를 사용하여 이미지, 오디오, 동영상 등의 사용자 제작 콘텐츠를 저장할 수 있습니다. 서버에서는 Google Cloud Storage API를 사용하여 동일한 파일에 액세스할 수 있다.


## 사용법
- firebase에서 storage 서비스를 활성화 시켜놨다는 전제하에 설명하겠다.
- 우선 현재 나의 파일과 연결시켜놓은 firebase.js에서 firebase storage를 추가해준다.

```javascript
// firebase.js
import firebase from "firebase/app";
import "firebase/storage"; // storage import하기!!

const storage = firebase.storage();

epxort { storage } // 외부에서 사용하기위해 export!
```

- 예를들어 redux에서 사용중이라면 리덕스에서 storage를 import 시켜준 후에 사용해주면 된다.
- 문자열에서 업로드를 하는경우 putString()을 이용하여 가능하다. 아래는 그중 data_url string 부분이다.
```javascript
var message = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
ref.putString(message, 'data_url').then(function(snapshot) {
  console.log('Uploaded a data_url string!');
});
```
put()과 putString()은 Promise로 사용허간 업로드 상태를 관리하고 모니터링하는데 사용할 수 있는 UploadTask를 반환한다. 참조는 파일의 전체 경로를 정의하므로 비어 있지 않은 경로로 업로드해야한다.

- 그 외에 storage기능들 보기 : https://firebase.google.com/docs/storage/web/upload-files?authuser=0
