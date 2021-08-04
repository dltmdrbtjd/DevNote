## 매니페스트(Manifest)란?
- 매니페스트(Manifest)는 PWA의 설치와 앱의 구성 정보를 담고 있는 json설정 파일이다. 이 설정은 크게 5가지 정도의 작업을 진행한다.
- App icon : 설치시 앱의 아이콘 이미지와 크기 설정
- 스플래시(splash screen)화면 : 로딩화면 설정
- Start URL : 웹앱이 실행될 때 가장 처음 보여질 URL설정
- Display Type : 웹앱의 화면 형태(browser, standalone, fullscreen ...)
- Display Orientation: 웹앱의 화면 방향 (가로모드, 세로모드)

## 매니페스트(Manifest)의 설정
- 매니페스트(Manifest)의 설정은 JSON으로 설정한다. 파일은 index.html의 head안에 배치한다.
```javascript
// index.html
<head>
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
</head>

// manifest.json
{
  "short_name": "HANG",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

- short_name 지정 : short_name은 필수 입력사항으로 이게 있어야 배너를 설치할 수 있다. 이건 프로젝트 이름으로 설치된 아이콘의 이름으로 표시 된다.
- name 지정 : name도 필수 입력사항으로 name이 있어야 배너를 설치할 수 있다. 이건 설치 배너에 표시되는 이름이며 검색 키워드로 사용된다.
- icons지정 : icons는 앱에서 필요한 다양한 크기의 아이콘을 지정한다. 그중에서도 192px(128dp)는 꼭 있어야 하는 크기의 아이콘이다. 이 아이콘이 있어야 스플래시 화면이 표시된다.
- splash screen 설정 : 스플래시 스크린은 3가지의 설정 조합으로 구성된다. 배경색 + 아이콘 + short_name(아이콘이름) 이 설정되어있다면 스플래쉬 화면이 나온다.
- start_url 설정 : start_url은 필수 요소로 웹앱이 실행될때 가장 처음 나오는 화면을 지정한다. 즉 스플래시 화면 다음에 나오는 화면이다. 기본 설정은 아래와 같이 이용하고 그 외에 Query String을 사용할 수 도 있다.
```javascript
"start_url": "./index.html",

"start_url": "./index.html?name=names1123",
```
- display 설정 : display의 설정은 웹앱이 어떤 모양으로 보여질지 설정하는 값이다.
   -  browser(normal): 해당 브라우저에서 기본 웹으로 실행
   -  standalone: 상단의 url바를 제거하여 네이티브앱처럼 보임(가장 많이 사용)
   -  fullscreen: 화면 전체를 사용하여 네이티브처럼 보임
   -  iOS에서 standalone사용시 <head>태그 안에 아래의 메타태크를 추가해야한다.
  
  ```javascript
  <meta name="apple-mobile-web-app-capable" content="yes">
  ```
  
- theme_color 설정 : 테마 컬러는 바라우저 상단의 url입력바와 시스템 바까지 포함한 색상을 지정할 수 있다.
  ```javascript
  "theme_color": "#c4c4c4",
  ```

- orientation 설정 : orientation은 기기의 방향을 가로로할지 세로로할지 지정하는 값이다. 게임이 아니라면 거의 세로모드를 사용하면 된다.
  ```javascript
  // 세로모드 : portrait , 가로모드 : landscape
  "orientation": "portrait",
  ```
  
- PWA를 설치할 수 있는 이벤트와 구현 방법 : 웹앱의 가장 기대하는 기능 중 하나가 웹앱을 설치할 수 있다는 것이다. 웹앱을 설정하기 위해서는 아래와 같은 몇가지 조건이 갖추어져 있어야한다. 
   - 기존에 웹앱이 설치되어있지 않아야한다.
   - 30초 이상 웹사이트를 탐색해야한다.
   - start_url , short_name, name이 설정되어 있어야한다.
   - Service Worker의 fetch 이벤트가 구현되어 있어야 한다.
   - HTTPS로 보안 서비스가 되어야 한다.
   - 원래 자동으로 설치배너가 보이게 되어있으나 설치버튼을 클릭하여 설치할 수 있도록 할 수도있다. 
  
- 참고한 블로그 : ( https://uxgjs.tistory.com/225?category=748572 ) 정리한 내용을 내가 알아보기 쉽게 작성하였다. 출처는 왼쪽 블로그 주인님 감사합니다 !
