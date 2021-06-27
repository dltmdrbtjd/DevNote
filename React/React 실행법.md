## React 정리에 앞서서 가장 기본적인 실행 방법
1. 우선 VScode를 설치 한다.
2. Windows 사용자는 Git Bash를 설치한다.
3. NVM을 설치한다. ( nvm은 Node.js의 버전 관리자이다. )
4. Node 공식 사이트에서 안정성 높은 버전을 다운받는다.
5. vs code 에서 npm으로 yarn을 설치한다.
6. 그 후 yarn add global create-react-app 으로 cra를 설치한다. 
7. 다음 yarn create react-app (원하는 프로젝트명) 으로 프로젝트를 만든다.
8. cd (원하는 프로젝트명) 으로 폴더로 이동후 yarn start로 리액트를 실행한다.

- nvm 설치 확인 ( VSCode에서 터미널로 확인! )
```
nvm --version
```

- nvm으로 노드 설치하기
```
nvm install [설치하고 싶은 버전]
```

- 설치가 잘 되었는지 확인
```
nvm ls # nvm으로 설치한 노드 버전 리스트 확인
node -v # 노드 버전 확인 명령어
```

- nvm에서 사용 중인 노드 버전 변경
```
nvm use [사용할 노드 버전]
```

- npm으로 yarn 설치하기 ( VScode 터미널에서, npm은 node설치시 자동으로 설치됨, npm은 Node Pakage Manager의 약자로 엄청 많은 패키지를 활용할 수 있게해줌, yarn이 좀 더 빠름 )
```
npm install -g yarn
# 이후 yarn 버전 확인
yarn -v
```
- yarn 으로 패키지 설치하기
```
yarn add [옵션] [설치할 패키지 이름]
```
- yarn 으로 CRA설치하기
```
yarn add global create-react-app
```

- yarn으로 react 프로젝트 생성하기
```
yarn create react-app [원하는 프로젝트명]
# 그 후 cd [생성한 프로젝트명] 으로 폴더에 이동후
# yarn start로 react를 실행해주면 끝
```

### React를 사용하기에 앞서 기본적인 사용법 정도는 숙지해두도록 하자.
