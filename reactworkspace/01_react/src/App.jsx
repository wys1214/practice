import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/*
# React
- 페이스북에서 만든 JavaScript 기반의 사용자 인터페이스(UI) 라이브러리 (즉 새로운 언어를 배우는 것은 아님)
  리액트를 사용하면 UI를 더 쉽고 효율np적으로 개발할 수 있음
- 페이스북에서 내부적으로 사용하다가, 2013년에 오픈 라이브러리 소스로 공개
- SPA (Single Page Application) : 하나의 페이지 (index.html) 내부에서 컨텐츠 영역만 변경되는 프로그램 (하나의 파일 화면만 보여주는 것)
- 내부 컨텐츠 영역을 컴포넌트 단위로 나누어 관리 (재사용 가능한 단위)

# SSR vs CSR
- SSR (Server Side Rendering) : 
  클라이언트가 페이지를 요청했을 때, 서버에서 자원(html, jsp 등)을 데이터 처리하고 만들어 클라이언트에게 응답
  하나만 변경되더라도 전체 페이지를 다시 만들어 클라이언트에게 제공 
  (ex) 세미프로젝트 마이페이지에서 정보 수정 후 다시 돌아올 때 전체 페이지가 다시 그려짐)

- CSR (Client Side Rendering) : 
  서버는 단순히 jsx, html, css 등과 같은 파일이 배포되는 공간만 제공하며, 클라이언트 요청시 정적 파일을 제공함
  응답받은 파일들을 Babel 컴파일러가 실행하는 구조
  모든 요청을 비동기 요청으로 보냄 : 상태 관리 라이브러리를 통해 

# JSX (JavaScript xml) : 기본 JavaScript 를 확장한 문법
- JS 코드를 html과 비슷한 방식으로 작성할 수 있는 문법
- JSX를 실행 시, 브라우저에서는 JSX 문법을 기본적으로 이해하지 못함 : Babel 이라는 컴파일러가 JS 문법으로 변환해 화면에 그려질 html 코드 생성
- 리액트에서는 컴포넌트(하단의 funtion : JS의 함수)영역을 크게 JS 영역 / JSX 영역으로 분리할 수 있음
  function App() {
    //JS 영역 (렌더링되기 전에 수행)
      - 변수, 이벤트 핸들러, 로직 처리 등 작성

    /JSX 영역
    return(
      -화면에 그려질 JSX 반환
    )
  }

# JSX 문법 작성 규칙
- 단 하나의 root 태그(최상단에 위치한 태그 : 아래의 경우 <div>-</div>)만이 존재할 수 있음 

- JSX 문법 내부에서 JavaScript 표현식(값을 반환)을 사용 시, {} 내부에 작성
  ex) 하단의 경우 JS표현식으로 작성된 const count를 JSX 문법 내에서 사용할 때 {count}로 작성함

- if / for 등의 문법은 표현식이 아니기 때문에 JSX 문법 내에서 {}로 사용 불가 
  if 의 경우는 3항 연산자, for의 경우는 map / filter 등을 사용해 리턴된 값을 사용
  cf) map - filter의 차이 : 원본 배열과 같은 길이의 새로운 배열 생성 / 조건을 만족하는 요소만 추출된 배열 생성(길이가 달라짐)

- 컴포넌트의 JS영역(상단)에서 JSX 문법을 변수에 저장할 수 있음
  ex) let num = 10;
   let jsxTest = <div>{num}</div>

- 기존 html에서 종료 태그가 없는 태그들(br, hr, input 등)도 종료태그 혹은 슬래시<br />가 필요 (xml 기반이기 때문)

- 기존 html 태그 속성명 => JSX 문법에서 작성 시 속성명
  class => className / for => htmlFor (label에 사용되었던) / 태그 속성명, css 스타일 속성명, 이벤트 속성명은 대부분 카멜 표기법으로 작성 (backgroundColor, colSpan, onClick, readOnly 등)

- 이벤트 핸들러 등록방법 : onclick="test()" => onClick={test}

- 스타일 지정방법 : style="color:red; font-size:16px;" => style={{color:'red',fontSize:'16px'}}

*/

function App() {
  //JSX 문법 - 1. 단 하나의 루트 태그만이 존재할 수 있음, 필요시 동위관계가 아니라 자식관계로 태그 추가 가능
  let jsx1 = <div>jsx1
                <div></div> {/* JSX 영역 안에서 JS 주석 작성 */}
              </div>;

  //JSX 문법 - 2. JSX 문법 내부에서 JS 표현식 사용 시 중괄호로 작성
  let hobby = '축구';
  let jsx2 = <span>{hobby}</span>;

  //JSX 문법 - 3. JSX문법 내부에서 if / for 문법은 사용 불가
  /*let jsx3 = <span>
    {
      if (hobby == '축구'){
        else{

        }
      }
    }
  </span> */
  
  //삼항연산자 표현식 - 조건식 ? true반환값 : false반환값
  let jsx3 = <span>
              {
                hobby == '축구' ? '취미는 축구입니다' : '취미는 축구가 아닙니다'
              }
            </span>

  //JSX 문법 - 4. 기존 종료 태그가 없는 태그들 모두 종료태그 작성 또는 시작태그 마지막에 슬래시 작성
  let jsx4 = <input type='text' name='memberId' />;

  //JSX 문법 - 5. 기존 HTML 속성명 => JSX 속성명
  let jsx5 = <label htmlFor='tagId' className='test-class'>라벨</label>;
  
  //JSX 문법 - 6. 이벤트 핸들러() 등록
  function testHandle(){
    console.log('testHandle 동작');
  }
  let jsx6 = <button onClick={testHandle}>버튼</button>;  //cf) testHandle() 로 작성시 클릭하지 않아도 함수가 실행됨 -> ()를 빼야 클릭 시만 작동

  //JSX 문법 - 7. 스타일 지정(먼저 JavaScript 객체에 스타일을 별도로 정의한 뒤 해당 객체를 {}로 사용해 지정)
  let testStyle = {color:'red', fontSize:'16px'};
  let jsx7 = <div style={testStyle}>스타일 지정 div</div>;
  //별도로 스타일을 지정하지 않는 경우
  let jsx8 = <div style={{color:'red', fontSize:'16px'}}>별도 선언 없이 스타일 지정 div</div>

  //JSX 문법
  let jsx9 = <div>
    <button className='btn-class' onClick={testHandle}>버튼</button>
      <div style={{backgroundColor:'pink'}}>DIV</div>
      <input type='text' name='memberName' id='memberName' /><br />
      <label htmlFor='memberName'>라벨</label>
  </div>;

  //화면에 렌더링 될 값을 저장하고 있는 변수
  let resData ='기존 값';

  //JS방식의 값 변경 : 요소 선택, 요소의 값 추출, 재할당 방식
  function resDataUpdate1(){
    resData = '변경된 값';
    console.log('resDataUpdate1');

    let spanEl = document.getElementById('resData');
    spanEl.innerText = resData;
  }

  /**
  React Hook (함수 세트)
    - use 키워드로 시작 (useState, useEffect, useContext, useReducer 등)
    - Hook 을 정의하는 소스코드는 컴포넌트(App) 내부의 가장 바깥에 작성해야 함
  useState
    - React Hook 중 하나이며, 이 기술을 사용하면 컴포넌트 내부 상태를 관리할 수 있다
    - state 변수로 관리할 데이터는 값이 변경되는 동적인 데이터 (정적인 데이터의 경우 state로 관리 부적합)

    [표현식]
    const [state, setState] = useState(initialState);

    state : 현재 상태 변수의 값, 초기 렌더링 시에는 initialState로 설정
    setState : 상태를 업데이트하고 컴포넌트를 재렌더링하도록 React에 지시하는 함수
    initialState는 숫자, 문자열, 불리언, 객체, 배열 등 어떤 타입도 될 수 있습니다. 
    만약 초기 상태가 계산이 필요한 값이라면, useState(() => expensiveCalculation())와 같이 함수를 전달하여 첫 렌더링 시에만 실행되도록 지연 초기화(lazy initialization)할 수 있습니다.

    상태 업데이트:
    setState 함수를 호출하여 상태를 업데이트
    setState(newValue); 또는 setState(prevValue => prevValue + 1);

    새로운 값 직접 전달: setState(newValue)와 같이 새로운 상태 값을 직접 전달할 수 있습니다.
    함수형 업데이트: setState(prevValue => prevValue + 1)와 같이 이전 상태 값을 인수로 받는 함수를 전달할 수 있습니다. 
    이 방식은 이전 상태에 기반하여 새로운 상태를 계산해야 할 때 유용하며, 비동기적인 상태 업데이트의 문제를 피할 수 있도록 보장합니다.

    
   */

  //useState 사용 : 문자열
  let [stateVar, setStateVar] = useState('state 변수 초기값');
  function stateUpdate1(){
    setStateVar('state 변수 값 변경');
  }


  //useState 사용 : 배열
  let [stateArr, setStateArr] = useState([1,2,3,4,5]);
  function updateArrFunc(){
    stateArr[2] = 300;  //3 -> 300
    setStateArr(stateArr);  //변경 함수를 매개변수로 배열 전달
    //setStateArr 함수의 매개변수로 전달한 배열의 주소값은 초기에 정의한 배열의 주소값과 동일하여, state변수가 변경되었다는 것을 인지하지 못함 -> 초기값이 그대로 화면에 표시
    //배열값을 변경하기 위해서는 새 배열을 만들어야 함
  }

  //직접 복사
  function updateArrFunc1(){
    let newArr = new Array(); //새 배열
    for(let i=0; i<stateArr.length;i++){
      newArr[i] = stateArr[i];
    }
    newArr[2]=300;
    setStateArr(newArr);  //새 배열을 매개변수로 useState에 전달, 컴포넌트 렌더링이 다시 일어남
  }

  //전개연산자
  function updateArrFunc2(){
    let newArr = [...stateArr]; //내부 요소를 그대로 복사한 새로운 배열 생성(깊은 복사의 일종)
    newArr[3] = 8;
    setStateArr(newArr);
  }

  //전개연산자를 통한 깊은 복사 - 값 추가 1
  function updateArrFunc3(){
    let newArr = [...stateArr];
    newArr.push(9); //배열의 마지막 값 추가
    setStateArr(newArr);
  }

  //전개연산자를 통한 깊은 복사 - 값 추가 2
  function updateArrFunc4(){
    let newArr = [...stateArr, 10, 11]; //기존 배열 + 10, 11
    setStateArr(newArr);
  }


  //useState 사용 : 배열
  let [userObj, setUserObj] = useState({name:'유저1', age:10, addr:'서울'});
  function updateObjFunc() {
    userObj.addr = '서울시 은평구 응암동';
    setUserObj(userObj);  //배열과 마찬가지로, 동일한 주소값을 가지고 있기 때문에 객체가 변경된 것을 인식하지 못하므로 렌더링이 다시 일어나지 않음(변화 없음)
  }

  //전개연산자를 통한 객체 복사
  function updateObjFunc1(){
    let newObj = {...userObj};
    newObj.addr = '서울시 은평구 응암동';
    setUserObj(newObj);
  }

  function updateObjFunc2(){
     let newObj = {...userObj, name:'유저2', hobby:'게임'}; //name은 기존에 존재하는 속성이기 때문에 기존 값이 변경, hobby는 새로운 속성으로 추가
     setUserObj(newObj);
  }


  return (
    <div>
      <h1>JS에서 선언한 변수를 화면에 보여주기 위한 데이터 바인딩</h1>
      <hr/>
      jsx1 : {jsx1}<br/>
      jsx2 : {jsx2}<br/>
      jsx3 : {jsx3}<br/>
      jsx4 : {jsx4}<br/>
      jsx5 : {jsx5}<br/>
      jsx6 : {jsx6}<br/>
      jsx7 : {jsx7}<br/>
      jsx8 : {jsx8}<br/>
      jsx9 : {jsx9}<br/>

      <hr/>

      <h1>기존 데이터 변경</h1>
      <h3>기존 JS 방식의 값 변경</h3>
      resData + id tag : <span id='resData'>{resData}</span><br/>
      resData : {resData}<br/>
      <button onClick={resDataUpdate1}>res 값 변경 버튼</button><br/>

      <h3>State 방식의 값 변경</h3>
      stateVar : {stateVar}<br />
      <button onClick={stateUpdate1}>State 값 변경 버튼</button><br/>

      <hr></hr>

      <h1>배열 state</h1>
      stateArr : 
        <ul>
          {stateArr.map(function(item, index){ //map : 각 요소마다 실행할 함수, 각 요소의 값, 요소의 인덱스 번호를 바탕으로 새 배열 생성
            return <li key={"li"+index}>{item}</li>

          })}
        </ul>
      <br/>

      <button onClick={updateArrFunc}>배열 변경 버튼 (미작동)</button><br/>
      <button onClick={updateArrFunc1}>배열 변경 버튼1 : 300</button><br/>
      <button onClick={updateArrFunc2}>배열 변경 버튼2 : 8</button><br/>
      <button onClick={updateArrFunc3}>배열 변경 버튼3 : + 9</button><br/>
      <button onClick={updateArrFunc4}>배열 변경 버튼4 : + 10, 11</button><br/>


      <hr/>
      <h1>객체 state</h1>

      <ul>
        <li>이름 : {userObj.name}</li>
        <li>나이 : {userObj.age}</li>
        <li>주소 : {userObj.addr}</li>
        <li>취미 : {userObj.hobby}</li>        
      </ul>
      <br/>

      <button onClick={updateObjFunc}>객체 변경 버튼 (미작동)</button><br/>
      <button onClick={updateObjFunc1}>객체 변경 버튼1 : 주소 변경</button><br/>
      <button onClick={updateObjFunc2}>객체 변경 버튼2 : 이름값 변경, 취미 추가</button><br/>


    </div>
  )
}

export default App
