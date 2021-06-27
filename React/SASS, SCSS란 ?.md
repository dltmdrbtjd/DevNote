## SASS, SCSS
- 리액트에서 자주 사용하게 될 CSS를 편하게 쓸수 있게 도와주는 것들이라고 생각하면 쉽다. SCSS는 SASS의 3번째 버전에서 추가된 녀석인데. SASS의 모든 기능을 쓸 수 잇고 CSS와 호환도 잘 맞아서 SCSS를 좀 더 많이 사용한다. SCSS사용 방법은 프로젝트 폴더에 scss파일을 생성하고 App.js에 import시켜주면 된다. 그리고 SCSS를 사용하기 위해서는 패키지를 설치해주어야 한다.
```
yarn add node-sass@4.14.1 open-color sass-loader classnames
```

## SCSS의 문법
- SCSS의 주요 문법들만 살펴보도록 하자 모든 문법을 다 외우는것은 CSS의 모든 속성 값을 다 외우지는 않는것 처럼 외울필요는 없다. 중요한것 몇가지만 알아두고 그때그때 필요한것은 공식문서에서 살펴보면 된다. https://sass-lang.com/documentation <-- 공식문서 사이트.
- 우선 기본적인 문법은 CSS와 동일한데 nesting기능이 가능하다.
```
div {
    p {
      color: #888888;
      font: {
          family:sans-serif; 
          size: 14px;
      }
    }

    img {
        width: 400px;
    }
}
```
위와 같이 div 아래에 p,img태그 등의 스타일을 줄때 다른 블록을 만들필요없이 축약형으로 묶어서 한 번에 사용할 수 있다.
```
div {
  background-color: green
  &:hover { background-color: blue }
}

.div {
  background-color: green
 &_blue { background-color: blue }
}
```

또 위와 같이 상위 요소 이어쓰기는 " & " 로 클래스명 등, 글자도 이어쓸 수 있다.

```
$defaultSize: 20px;
$className: blue;

p{
	font-size: #{$defaultSize};
	&.#{$className} {color: #{$className}}
}
```
또 위와 같이 문자열로 치환하여 사용가능하다. ( 즉 변수를 사용할 수 있다 ! ) 자주쓰는 스타일이 있다면 변수명으로 지정해놓고 사용하면 매우 편하다고 볼 수 있다.
