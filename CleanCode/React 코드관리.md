# React의 클린코드 및 코드관리
- 코드리뷰의 이유 : 코드리뷰는 잘하고 못하고를 떠나서 코드를 작성할때 더 효율적인 방법을 찾기 위함이다. 협업을 위한 컨벤션, 재활용성,설명이 쉬운 코드등 팀마다 주의깊게 보는 부분이 다르기 때문에 같은 코드라도 리뷰하는 사람에 따라 다른 리뷰를 받을 수 있다.

## 클린 코드는 작은것부터
- 안쓰는 코드 및 파일은 삭제한다. ( 사용하지 않는 패키지 import하지 않기 , 사용하지 않는 파일 및 코드는 삭제하고 쓸데없이 코드 주석을 남겨놓지 말자, 주석을 잘 정리하기(git활용) )
- 변수명은 직관적으로 사용한다.
```javascript
// 올바른 예시
const user_id = "";
const post_user_id = "";
// 잘못된 예시
const id = "";
const id2 = "";
```

## 함수형 컴포넌트의 state관리
- 같은 묶음으로 묶을 수 있는 state는 묶어서 관리하도록 하는게 좋다. ( ex. 아이디,비번,비밀번호체크,닉네임 등등의 회원가입 예시일경우 )
```javascript
const [user_info, setUserInfo] = useState({...});

<input onChange={(e) => {
  setUserInfo({...user_info, id:e.target.value};}} 
/>
```

## template.js을 활용해보자
- components 및 redux/modules 등을 사용할때 기본적인 template.js를 만들어놓고 그 방식에 맞게 협업하면 최대한 컨벤션을 지키면서 코드를 작성할 수 있다.

## console.log를 잘 관리하자
```javascript
// 잘못된 예시
console.log("1111");
console.log("2222");

// 올바른 예시
console.log("header component : after login:::", something);

// 좋은 예시 (로거 함수 만들어서 사용하기)
const logger = (msg) => {
  if(process.env.NODE_ENV === "production"){
    return;
  }
  console.log(msg);
}
```


## 주석을 잘 달아주자
- 함수의 경우 : 이 함수가 하는일, 파라미터로 뭘 받아오는가? , 리턴 값은 무엇인가 ? ,함수 사용법은 무엇인가 ?등을 작성
- 컴포넌트의 경우 : 어떤 컴포넌트 인가? (역할 등 설명) , 필요한 props는 무엇인가? , 컴포넌트 사용 방법은 무엇인가 ? 등을 작성
- 주석에 들어가면 좋은것 : 작업자가 누구인지(협업시), 수정을 하면 어떤걸 수정했는가? , 이 코드가 하는일은 무엇인가? (어떤 기능인지, 뭘 필요로하는지, 어디와 관련이 있는지 간략하게 작성)

## 스타일 전역 관리하기
- globalStyle , themeProvider 사용하기
- 둘 다 styled-components에 있기 때문에 활용법을 검색하여 사용하면 스타일은 좀 더 전역으로 관리하기 편해진다.

## 에러 후 처리를 신경쓰자
```javascript
// 잘못된 예시
.catch((err) => {
  console.log(err);
});

// 올바른 예시
.catch((err) => {
  window.alert("게시글 작성에 실패했습니다. 나중에 다시 시도해주세요");
  history.push("게시글 작성하기 전 페이지의 url");
  console.log(err);
}

// 좋은 예시
.catch((err) => {
  if(window.confirm("게시글 작성에 실패했어요! 이전 페이지로 돌아갈까요?")){
    history.push("게시글 작성전 url");
  } else {
    clearSomeState();
    // 스피너 등 게시글 작성 버튼 클릭 전 상태로 돌리는 함수
  }
  console.log(err);
});
```

## 함수형 컴포넌트, return은 최대한 단순하게 !
- 삼향연산자의 사용도 좋지만 내부에 들어가는 코드가 길어지면 가독성이 매우 떨어진다.
``` javascript
// 좋지 않은 예시
return (<div>
{a? (something? b:c) : (d)}
</div>)

// 좋은 예시
if(is_login){
  return(
    <div></div>
  )
}
return (
  <div></div>
)
```

## axios를 모듈화 하여 사용하자
- 매번 헤더를 설정하지 말고 모듈화를하고 사용하도록 하자
```javascript
// 예시
import axios from 'axios';
import { getToken } from './token';

const instance = axios.create({
  baseURL:'http://abc.shop:3000/'
});

instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['Accept'] = '*/*';
  config.headers['authorization'] = `Bearer ${getToken()}`;
  return config;
});
```

## document에 직접 접근하지 말자
```javascript
const openModal = () => {
  document.querySelector(".openModal").click();
};
```

## immer를 immer답게 사용하자!
```javascript
// 잘못된 예시
const a = [1,2,3];
const b = [...a,4];

list = [{a:1, id:0},{a:2, id:1}, ...];
const new_list = list.map( i => {
  if(i.id === 0) {return {...i, b:3}}
  return i;
});

// 올바른 예시
const a = [1,2,3];
a.push(4);

list = [{a:1, id:0}, {a:2, id:1}, ...];
const index_num = list.findIndex(i => i.id === 0);
list[index_num].b = 3;
```
