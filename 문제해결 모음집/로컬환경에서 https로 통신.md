## localhost 3000에서 https로 서버와 통신하기
- 서버에서 Set-Cookie로 헤더에 토큰을담아서 프론트로 보내주고 그것으로 서버에서 로그인한 유저를 체크하면서 핸들링하는데 에러가 줄줄이 튀어나왔다. 나 또한 처음접해본 방식이라서 팀원들과 다같이 해결하는데 시간이 많이걸렸지만 결국 해결했었다. 우선 CORS에러가 튀어나왔고 서버에서 origin주소를 우리 로컬주소로 바꿈으로써 해결되었고 그 다음은 Set-Cookie를 보내는건 맞는데 프론트쪽에 저장이 되지않는 일이 발생했다. 그 이유는 에러메시지를 계속 따라가다보니 same-site관련 오류 였는데 same-site를 none으로 처리하면 secure아 true로 적용되는데 이 방법을 해결하기 위해서는 클라이언트와 서버 양측모두 https 환경이여야지 통신이 가능하다는 결론에 도출했다. 그래서 서버는 https로 배포하는 작업을 진행하였고 우선 클라이언트는 로컬환경에서 https를 적용하여 서버와 통신할수있도록 준비하는 과정을 각자 거쳤다. 여기서 내가 로컬환경에서 https로 적용하기 위한 방법에 대해서 성공한것을 추후에 내가 또 같은오류를 맞이할 수 있기때문에 여기에 서술해놓으려고 한다.

## localhost에 https 적용하기
1. https://chocolatey.org/install 에 접속하여 하단 2번에서 widnow powershell에서 사용할 값을 복사한다.
2. window powershell을 관리자 권한으로 실행한다.
3. 1번에서 복사한 값을 입력해준다.
4. 'choco -v'를 입력하여 choco가 잘 설치되었는지 버전을 확인해준다.
```
choco -v
```
5. choco 에서 mkcert를 설치해준다.
```
choco install mkcert
```
6. mkcert를 install한다.
```
mkcert -install
```
7. mkcert localhost 127.0.01을 입력해준다.
```
mkcert localhost 127.0.0.1 ::1
```
8. 그럼 이제 localhost+2.pem , localhost+2-key.pem 이 뜰것이다.
9. window + R 키를 눌러서 MMC를 실행한다.
10. 좌측 메뉴 상단의 파일 -> 스냅인 추가/제거 -> 인증서를 더블 클릭한다.
11. 인증서 스냅인에서 컴퓨터 계정을 선택한다.
12. 컴퓨터 선택에서 로컬 컴퓨터를 선택하고 마침을 누른다.
13. 좌측 메뉴에서 인증서 - 신뢰할 수 있는 루트 인증 기관으로 이동한다.
14. 인증서를 우클릭하고 모든 작업 -> 가져오기를 누른다.
15. 다음을 누르고 가져올 파일에서 아까 windows powershell에서 마지막에 받은 localhost+2.pem을 넣어준다.
16. c드라이브 -> windows -> system32 에서 8번에서 생성된 파일 2개를 찾는다.
17. 현재 내가 작업하고있는 폴더 root 디렉토리에 넣어준다. ( react기준으로 src밖에 )
18. root 디렉토리에 .env 파일을 생성하고 아래 코드를 입력해준다.
```
HTTPS=true
SSL_CRT_FILE=localhost.crt <- 받은 crt파일
SSL_KEY_FILE=localhost.key <- 받은 key파일
```
19. 그 후 다시 yarn install로 실행해주면 https가 적용되어있다.

- 추후에 다시 같은 상황을 겪게될수있으므로 미리 정리해두었다. 좋은경험이다!
