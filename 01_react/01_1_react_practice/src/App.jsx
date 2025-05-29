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

  let [stateArr, setStateArr] = useState([0,1,2,3,4,5]);
  function stateArrUpdate(){
    let newStateArr = [...stateArr, 6, 7, 8, 9];
    setStateArr(newStateArr);
  }

  let [stateObj, setStateObj] = useState({name:'재의 귀인', game:'다크소울3', weapon:'롱소드'});
  function stateObjUpdate(){
    let newStateObj = {...stateObj, name:'빛 바랜 자', game:'엘든링', weapon:'클레이모어'};
    setStateObj(newStateObj);
  }


  return (
    <div>
      {div}<br/>

      {label1}{input1}<br/><br/>

      {button1}<br/><br/>

      {stateStr}<br/>
      <button onClick={stateStrUpdate}>stateStr 문자열 업데이트</button><br/><br/>

      {stateArr}<br/>
      <button onClick={stateArrUpdate}>stateArr 배열 업데이트</button><br/><br/>

      <ul>
        <li>{stateObj.name}</li>
        <li>{stateObj.game}</li>
        <li>{stateObj.weapon}</li>
      </ul>
      <button onClick={stateObjUpdate}>stateObj 객체 업데이트</button>

    </div>
       
  )
}

export default App
