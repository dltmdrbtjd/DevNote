## 인스턴스 라이프사이클
- 각 Vue 인스턴스는 생성될 때 일련의 초기화 단계를 거친다. 예를 들어, 데이터 관찰 설정이 필요한 경우, 템플릿을 컴파일하는 경우, 인스턴스를 DOM에 마운트하는 경우, 그리고 데이터가 변경되어 DOM에 업데이트를 하는 경우가 있다. 그 과정에서 사용자 정의 로직을 실행할 수 있는 라이플사이클 훅 도 호출된다. 
- 공식문서를 읽어보면서 느낀점은 React의 라이프 사이클과 엄청나게 크게 다른점은 없다고 생각이 들었다. 그래서 좀 더 Vue의 라이프사이클 흐름을 이해하는데 어려움이 있지는 않았던것 같다.

## 라이프사이클 훅
- create, mounted, updated, destroyed 등이 여러 단계에서 호출된다. 모든 라이프사이클 훅은 this 컨텍스트가 호출하는 Vue 인스턴스를 가리키며 호출된다. Vue 에서 '컨트롤러'의 컨셉이 어디에 있는지 궁금할 수 있지만 컨트롤러는 없다. 컴포넌트의 사용자 지정 로직은 이러한 라이플사이클 훅으로 분할할 수 있다.
- 주의할 점
  - options 속성이나 콜백에 create: () => console.log(this.a)나 vm.$watch('a', newValue => this.myMethod())와 같은 화살표 함수 사용은 공식문서에서 지양하기를 바란다고 작성되어 있다. 이건 javascript의 arrow function에 대해 공부했을때의 내용과 연결되는 부분인데 화살표 함수는 this를 가지지 않기 때문에 화살표 함수에서의 this는 다른 변수로 취급되거나 렉시컬하게 호출한 변수를 발견할 때 부모 스코프에서 해당 변수를 찾는다. 그래서 오류를 발생시킬 수 있다.
  - 라이프사이클 훅을 좀 더 깊게 들여다보면 beforeCreate,create / beforeMound, mounted / beforeUpdate, update / beforeDestory, destoryed 이런식으로 발생전과 발생시점 등등 좀 더 세분화 되어있다. 실제로 React의 라이프사이클 훅과 많이 유사한 느낌을 받았다. componentWillMount, componentDidMount를 예시로 들면 mount가 되기전과 되고나서의 로직을 구현했던것 처럼 비슷한 흐름을 가져간다고 생각된다. 이건 개인적인 생각이기 때문에 정확하지는 않을수 있다.

## 라이프사이클 다이어그램 ( 공식문서 Image )
<p align="center">
  <img src="https://kr.vuejs.org/images/lifecycle.png" width="600px"/>
</p>
