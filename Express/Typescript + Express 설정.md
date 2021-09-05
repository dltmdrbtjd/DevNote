## TypeScript를 이용해서 Node.js의 Express시작하는 방법
1. tsc 컴파일러가 설치되어있는지 확인하고 설치되어 있지 않다면 설치한다.
```
tsc --version // 설치 확인 방법
npm i -g typescript // 설치 방법
```

2. app.ts를 생성후 컴파일이 정상적으로 작동되는지 확인한다.
```
tsc app.ts
```

3. tsconfig.json 파일을 생성해준다.
```
tsc --init
```

4. tsconfig.json 파일을 설정해준다.
   - 주석이 굉장히 많이 있어서 당황할 수 있지만 당황하지말고 우리가 필요한 설정값만 수정하고 지정해주면 된다.
   - 필요한 부분들만 작성해두었으니 tsconfig.json에서 해당 부분을 수정해준다.
```javascript
"target": "es6" // es5로 설정되어 있을텐데 es6로 변경해준다. ( const, arrow function 적용된 js로 컴파일이 된다. )
"outDir": "./dist" // 처음에 주석처리 되어있을텐데 주석을 풀고 옆과 같이 작성해준다. ( 컴파일시 나오는 파일들을 넣을곳을 지정하는 것이다. )
"rootDir": "./src" // 마찬가지로 주석을 풀어준다. ( 어떤 폴더에 있는 파일들을 컴파일할지 정하는 것이다. )
"moduleResolution":"node" // 주석을 헤제한다.

// 해당 부분까지 잘 따라왔다면 우선 설정이 완료되었다.
```

5. 앞에서 작성한 app.ts파일을 src폴더 생성후 옮겨준다.

6. package.json을 생성해준다.
```
npm init -y
```

7. express를 설치해준다.
```
npm i express
```

8. 나머지 모듈들은 개발 의존성 패키지를 설치한다. 개발할때 노드몬이 서버를 감시할 수 있도록 노드몬도 설치하고 노드와 익스프레스의 사용자 정의 유형도 설치해준다.
```
npm i -D typescript ts-node nodemon @types/node @types/express
```

9. package.json의 devDependencies에 설치가 완료되었는지 확인한다.
```javascript
"devDependencies": {
    "@types/express": "^4.17.13",
    "@types/node": "^16.7.10",
    "nodemon": "^2.0.12",
    "ts-node": "^10.2.1",
    "typescript": "^4.4.2"
  }
```

10. package.json에서 scripts 설정을 변경한다.
```javascript
"start" : "node dist/app.js" // 어떤 파일을 실행할지에 대한 설정
"dev" : "nodemon src/app.ts" // 개발환경에서 어떤걸 실행할지에 대한 설정
"build": "tsc -p ." // ts -> js 빌드 설정
```

11. app.ts를 dev로 실행하여 5000번 포트로 들어가서 확인해본다. ( localhost:5000 )
```typescript
import express from 'express';

const app = express()

app.get('/', (req, res, next) => {
  res.send('Hello')
})

app.listen(5000, () => {
  console.log('Server running')
})

// 작성 완료후 npm run dev
```

12. nodemon으로 실행시 파일들이 수정이 될때마다 서버를 자동으로 재시작시켜준다. console.log추가후 제대로 실행되는지 확인해보자.
```typescript
import express from 'express';

const app = express()

app.get('/', (req, res, next) => {
  console.log('nodemon') // 여기 콘솔로그 추가
  res.send('Hello')
})

app.listen(5000, () => {
  console.log('Server running')
})
```
저장후에 새로고침하면 바로 서버가 재실행되고 console이 찍힐것이다.

13. dist 폴더를 생성해보고 es6가 제대로 적용되었는지 확인해보자.
```
npm run build
// build가 다 되면 dist 폴더가 생성되는데 app.js에 es6문법이 잘 적용되었는지 확인해본다.
```

14. 서버가 잘 실행하는지 확인해본다.
```
npm run start
```

15. 마지막으로 사용자 유형 정의 패키지를 앞에서 설치하였기 때문에 req,res,next에 타입 지정이 이제 가능하다. 아래와 같이 타입을 지정해보자
   - express를 앞에 붙이기 싫다면 import를 통해서도 타입지정이 가능하다.
```typescript
import express, {NextFunction} from 'express';

const app = express()

app.get('/', (req:express.Request, res:express.Response, next:NextFunction) => {
  console.log('nodemon')
  res.send('Hello')
})

app.listen(5000, () => {
  console.log('Server running')
})
```


16. 여기까지 잘 따라왔다면 TypeScript로 express를 시작할 준비는 모두 끝났다.
