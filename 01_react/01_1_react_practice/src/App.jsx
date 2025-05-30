import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  let divStyle = {color:'red', fontSize:'20px', backgroundColor:'gray'}
  let div = <div style={divStyle}>스타일 지정 div</div>

  let label1 = <label style={{color:'blue', fontSize:'15px'}} htmlFor='input1'>label1 </label>
  let input1 = <input id='input1'></input>

  let button1 = <button id='button1' onClick={testFunc}>testFunc button</button>
  function testFunc() {
    console.log('testFunc 함수 호출');
    
    let button1El = document.getElementById('button1');
    button1El.innerText = 'testFunc 함수 호출 완료';
  }

  let [stateStr, setStateStr] = useState('stateStr 초기 문자열');
  function stateStrUpdate(){
    setStateStr('stateStr 변경 문자열');
  }

  let [homeStr, setHomeStr] = useState('초기 homeStr');
  function updateHomeStr(){
    setHomeStr('업데이트 homeStr');
  }

  let [stateArr, setStateArr] = useState([0,1,2,3,4,5]);
  function stateArrUpdate(){
    let newStateArr = [...stateArr, 6, 7, 8, 9];
    setStateArr(newStateArr);
  }

  let [homeArr, setHomeArr] = useState([10, 20, 30, 40, 50]);
  function updateHomeArr(){
    let newArr = [...homeArr, 60, 70, 80, 90];
    setHomeArr(newArr);
  }

  let [stateObj, setStateObj] = useState({name:'재의 귀인', game:'다크소울3', weapon:'롱소드'});
  function stateObjUpdate(){
    let newStateObj = {...stateObj, name:'빛 바랜 자', game:'엘든링', weapon:'클레이모어'};
    setStateObj(newStateObj);
  }

  // 버튼 클릭 등의 이벤트 핸들러 내부에서 바로 setStateObj를 호출
  const handleClick = () => {
    setStateObj(prevState => ({
      ...prevState, // 이전 상태를 복사
      name: '빛 바랜 자',
      game: '엘든링',
      weapon: '클레이모어'
    }));
  };

  /*
  # 화살표 함수
  // 기본 문법
  (param1, param2) => { statements }

  // 파라미터가 하나일 때 괄호 생략 가능
  param => { statements }

  // 파라미터가 없을 때 빈 괄호 사용
  () => { statements }

  // 본문이 하나의 표현식(expression)일 때 중괄호와 return 생략 가능
  (param1, param2) => expression
  // 위는 { return expression; } 와 동일합니다.


  // 일반적인 함수 선언
  function add(a, b) {
    return a + b;
  }
  console.log(add(2, 3)); // 5

  // 익명 함수 (함수 표현식)
  const subtract = function(a, b) {
    return a - b;
  };
  console.log(subtract(5, 2)); // 3


  // 기본 형태 (파라미터 여러 개, 중괄호, return)
  const add = (a, b) => {
    return a + b;
  };
  console.log(add(2, 3)); // 5

  // 본문이 단일 표현식일 때 (가장 간결한 형태)
  const addConcise = (a, b) => a + b;
  console.log(addConcise(2, 3)); // 5

  // 파라미터가 하나일 때 괄호 생략
  const double = num => num * 2;
  console.log(double(7)); // 14

  // 파라미터가 없을 때
  const greet = () => "Hello, World!";
  console.log(greet()); // "Hello, World!"

  // 객체를 반환할 때 주의: 중괄호와 헷갈리지 않도록 괄호로 감싸야 함
  const createUser = (name, age) => ({ name: name, age: age });
  console.log(createUser("Alice", 30)); // { name: 'Alice', age: 30 }
  */
  
  let [homeObj, setHomeObj] = useState({name:'크레이토스', game:'갓 오브 워', weapon:'혼돈의 블레이드'});
  function updateHomeObj(){
    let newObj = {...homeObj, name:'세키로', game:'세키로', weapon:'쿠사비마루'};
    setHomeObj(newObj); 
  }

  return (
    <div>
      {div}<br/>

      {label1}{input1}<br/><br/>

      {button1}<br/><br/>

      {stateStr}<br/>
      <button onClick={stateStrUpdate}>stateStr 문자열 업데이트</button><br/><br/>

      {homeStr}<br/>
      <button onClick={updateHomeStr}>homeStr 문자열 업데이트</button><br/><br/>

      {stateArr}<br/>
      <button onClick={stateArrUpdate}>stateArr 배열 업데이트</button><br/><br/>

      {homeArr}<br/>
      <button onClick={updateHomeArr}>homeArr 배열 업데이트</button><br/><br/>

      <ul>
        <li>{stateObj.name}</li>
        <li>{stateObj.game}</li>
        <li>{stateObj.weapon}</li>
      </ul>
      <button onClick={stateObjUpdate}>stateObj 객체 업데이트</button><br/><br/>
      <button onClick={handleClick}>stateObj 객체 업데이트</button><br/><br/>

      <ul>
        <li>{homeObj.name}</li>
        <li>{homeObj.game}</li>
        <li>{homeObj.weapon}</li>
      </ul>
      <button onClick={updateHomeObj}>homeObj 객체 업데이트</button>
    </div>
       
  )
}

export default App
