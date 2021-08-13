## Interceptors 
- 인터셉터란 요청을 처리하기 전에 요청이나 응답을 가로 챌 수 있다. 즉 서버와 요청함에 있어서 중간 미들웨어를 설정할 수 있다.

## 예시
- 아래 예시는 서버에 요청을 보낼때마다 매번 토큰을 보내줘야 하기 때문에 그 부분을 애 요청시에 headers에 담겨서 갈 수 있도록 사용하였던 예시이다.
```javascript
instance.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.token = getCookie();
  config.headers.Accept = 'application/json';

  return config;
});
```

- 아래 예시는 서버에서 response를 받을때 401오류 처리를 axios를 전역으로 관리한곳에서 처리하기 위해서 사용한 예시이다.
```javascript
instance.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    const path = window.location.pathname;

    if (
      error.response.status === 401 &&
      !['/signup', '/login'].includes(path)
    ) {
      window.alert('토큰이 만료되었습니다.');
      delCookie();
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);
```
위 예시를 사용했을때 response를 그냥 return response로 처리하면 오류가 발생했을때 아무 데이터도 담겨있지않은 response가 들어와서 redux가 비어버리는 문제가 발생해서 그 부분을 막기 위해서 Promise.resolve(resposne)로 처리했다. 이렇게 처리하면 제대로 response가 들어왔을때만 처리해주기 때문에 빈 데이터가 통과되는 문제를 피할수있다. 또 아래에 에러문도 redux내에서 catch로 사용한 에러를 발생시키기 위해서 return Promise.reject(error)를 사용해서 401에러가 아닐시에는 catch문으로 가도록 처리한것이다. 이 부분을 유의해서 사용하면 좀 더 편리하게 사용할 수 있다.
