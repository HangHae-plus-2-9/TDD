# 장애대응 훈련

## 장애대응 대표 유형

### 1. 트래픽 부하

- Artillery 활용
  - GET 상품 조회 api
    - Parameterized API call: 10,000 RPS
  - POST 상품 구매 api

### 2. 외부서비스

- payment mock 서버 활용
  - Up 상태: payment endpoint 200 OK
  - Down 상태: payment endpoint 500 Internal Server Error

### 3. 휴먼 에러 - 비즈니스 로직 상 실수

- 관리자에 의한 DB table drop

### 4. 배포 시 Migration Error

- Migration을 고려하지 않은 column 변경
  - column name 변경
  - NULL -> NOT NULL 변경

### 5. 코드 에러

- 

## 장애대응 시나리오

> 1. **장애 탐지** (시스템 알람, 고객센터, QA팀, 사내제보)
> 2. **장애 공지** (Slack, KakaoTalk 등 실시간 알람을 받을 수 있는 SNS > 활용)
> 3. **장애 전파** (사내 내부 조직, 팀원, 고객 등)
> 4. **장애 복구**
> 5. **장애 후속 조치**
> 6. **장애 회고** (왜 장애가 발생했으며, 앞으로 어떻게 처리해야 할지 대응책 마련)
