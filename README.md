This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Soomsun

사람과 사람을 이어주는 O2O 서비스
요청서에 맞는 원하는 서비스를 추천

더미데이터의 처리!
json 형식의 데이터를 indexJson.js를 통해 객체로 생성하여(jsonResponse) import 했다.

## Form

지원서의 질문 양식 부분을 Form Component를 통해 stateful Component로 구현

마지막 질문일 경우, Next 버튼 숨기기 또는 disabled 처리 그리고 Submit 생성

tempOption를 만들어서 Next를 클릭하기 전에 저장한다.

Next클릭과 함께 선택한 tempOption를 output data에 담는다
질문에 대한 대답은 "text" 키로 되어 있지만 output data를 위해서는
"answer" 키에 넣어주어야 한다. 키 자체를 변경하던지,(1)
하나하나 요소를 빼서 다시 넣어준다.(2)
