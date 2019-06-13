This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```
yarn install
yarn start
```

# Soomsun

## 숨은 선생님을 찾아서!

사람과 사람을 이어주는 O2O 서비스로 요청서에 맞는 원하는 서비스를 추천

---

## 더미데이터의 처리

- json 형식의 데이터를 indexJson.js를 통해 객체로 생성하여 (jsonResponse) export

## Component

### App

- 폼의 타이틀을 렌더링하며, Form 컴포넌트를 import
- `jsonResponse`를 import하여 Form에 props 전달

### Form

- 지원서의 질문 양식 부분을 stateful Component로 구현
- 질문 더미 데이터를 `formType`에 따라 케이스를 나누어 렌더링
- 마지막 질문일 경우, Next 버튼 숨김 처리와 Submit 버튼 생성

## State

- `currentIndex` : 현재 폼의 index
- `selectedOption` : 최종적인 Output 데이터
- `tempOption` : 현재 머물러 있는 질문에 대해 선택 값을 `selectedOption`에 저장하기 전의 임시 데이터. 즉, Next 버튼을 누르기 전 데이터
- `isComplete` : 벨리데이션 체크가 완료된 최종 데이터가 생성되면, `isComplete=true`를 통해 완료 폼 렌더링

## Function

- `_checkedOption` : `formType=1`인, 즉 selectbox에 대한 onChange 이벤트 콜백함수
- `_setOption` : `tempOption`을 통해 저장한 임시 데이터를 `selectedOption`에 세팅. Next/Submit 버튼 클릭 이벤트 콜백함수
- `_renderFormType` : `formType`에 따라 케이스를 나누어 렌더링
