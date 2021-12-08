
## Lambda를 사용하는 것에 있어 가장 큰 단점이자 어려움은 Cold start인 것 같다. 


### first start
<img width="246" alt="스크린샷 2021-12-08 오후 1 02 07" src="https://user-images.githubusercontent.com/59644518/145222559-01b5c8ae-9296-4416-97ce-aa39dbf68e69.png">


### second start
 <img width="306" alt="스크린샷 2021-12-08 오후 1 03 01" src="https://user-images.githubusercontent.com/59644518/145222622-1f4aca29-26ee-4592-a1e0-8256d1c3517a.png">


## Cold start
- Lambda의 근간이 되는 기술은 Container이다. 때문에 Lambda를 쓰게 되면, 가장 낮은 사양으로 셋팅하더라도, 부하가 생기는 순간에, Container가 빨리 빨리 뜨면서 Scale-out이 되고, 그것이 부하들을 다 받아낼 수 있을거라는 기대를 하게 된다. 개념적으로는 맞는 말이다. 그러나 실제로는 그렇게 되지 않는 경우가 많이 존재한다. 그렇지 않은 경우는 빠르게 컨테이너가 생성되지 않는 경우. 즉 cold start

- 간단하게 표현하자면 Cold start라는 것은 결국, 꺼져있는 완전 식어버린 컴퓨터를 새로 킨다는 의미이다. 굳이 비유하자면, 잠시 절전 모드의(전원은 켜져있는)컴퓨터를 키는것 보다는, 완전히 꺼져버린 컴퓨터를 새로 키는데 시간이 더 많이 발생한다는 개념으로 접근하면 쉽다. 

 

## 개인적으로 찾아본 해결책은 4가지를 찾았다. 

1. 람다의 사양을 높인다. [ 비용이 발생한다. ] 

2. cold start는 꺼져있는 상태가 문제이다. 그러므로 warm start를 한다. [ Provisioned Concurrency service를 사용하는 비용이 발생한다. ] 

3. 자체적인 warmer만들기 [ CloudWatch Event의 스케쥴러, 배포환경에서 스케쥴러 등등 이용, 직접 해야해서 소요하는 시간 발생함 ]

4. 일정량의 요청이 꾸준히 들어와서 적든,많든 요청을 처리할 컨테이너가 계속 떠있게해서 cold start문제를 최소화 시키는게 좋다. ( but, scale out 장점 반감되지만 비용적인 측면에서 이득 )

 
- 1번 방식의 해결책을 사용해서 다음과 같이 속도를 향상 시켰다.


## first start
![362C15F7-681F-4772-8C2B-222393C83771_4_5005_c](https://user-images.githubusercontent.com/59644518/145222966-aef7c377-810b-42b6-afd5-ee18a8df2ca2.jpeg)

## second start
<img width="175" alt="스크린샷 2021-12-08 오후 3 45 26" src="https://user-images.githubusercontent.com/59644518/145222992-39997e8e-7b08-4af4-afe7-46d2b9aeabd6.png">


 

https://aws.amazon.com/ko/blogs/aws/new-provisioned-concurrency-for-lambda-functions/

https://aws.amazon.com/ko/blogs/compute/operating-lambda-performance-optimization-part-1/
