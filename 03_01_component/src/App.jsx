import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//별도로 생성한 파일에서 작성한 컴포넌트 import : 경로명과 컴포넌트명을 따로 작성, import한 컴포넌트는 하단 <>안에 작성
import UseComponent1 from './component/componentTest1'

function App() {
  /**
   * 컴포넌트(component) : 사용자에게 보여지는 UI요소들을 구성하는 단위
   * 리액트 프로젝트는 SPA(Single Page Application)으로, 브라우저에 보여지는 페이지는 index.html 하나임
   * 사용자 액션이나 로직에 따라 각 화면으로 전환되는데, 각각의 페이지를 따로 만드는 것이 아니라 컴포넌트를 여러 개 만듦
   * 
   * 컴포넌트 작성 규칙
   * - 컴포넌트 명칭은 대문자로 시작할 것 (App.jsx)
   * - 컴포넌트는 단일 책임 원칙에 따라 1가지의 기능만을 담당
   * - 컴포넌트는 재사용이 가능한 단위로 작성 (필수는 아님)
   * - 컴포넌트를 사용할 때, 속성으로 필요한 데이터를 전달할 수 있음 (파라미터)
   *   사용되는 컴포넌트에서 전달받은 데이터를 사용할 때, props 라는 파라미터(객체 자료형)에서 추출해 사용
   * - 전달받은 props는 읽기 전용이므로, 변경하여 사용하지 말 것
   * 
   * 컴포넌트와 State 변수
   * - 컴포넌트는 항상 계층(트리) 구조를 따라 상위에서 하위로 내려가는 단방향 데이터 흐름을 가짐
   * - 부모에서 선언한 State 변수를 자식 컴포넌트에서 사용 가능하지만, 반대의 경우는 사용 불가능
   * - 부모 컴포넌트가 전달한 값은 자식 컴포넌트에서 선언한 State 변수의 초기값으로는 부적합
   *   (자식 컴포넌트 내에서 새로 State 변수 생성 시, 부모에게 전달받은 State 변수의 초기값과 동일하게 초기값 설정 X)
   * - 여러 자식 컴포넌트가 동일한 상태의 State 변수를 를 공유해야 한다면 부모 컴포넌트에 선언해야 함
   *   자식 컴포넌트의 상태가 부모 컴포넌트에도 필요한 상황이어도 마찬가지로 부모 컴포넌트에 선언
   */

  const [state1, setState1] = useState("State1 문자열");
  const [state2, setState2] = useState(100);
  const [state3, setState3] = useState([1,2,3,4,5]);
  const [state4, setState4] = useState({name:'user', age:10, addr:'addr'});
  const [state5, setState5] = useState([
    {name:'user1', age:10, addr:'addr1'},
    {name:'user2', age:20, addr:'addr2'},
    {name:'user3', age:30, addr:'addr3'},
    {name:'user4', age:40, addr:'addr4'},
    {name:'user5', age:40, addr:'addr5'}
  ])

  return (
    <>
      {/** 외부 파일에서 작성한 컴포넌트가 반환하는 JSX를 현재 위치에 포함 */}
      <UseComponent1/>
      {/** 재사용 가능 */}
      <UseComponent1/>
      {/** 현재 파일에서 정의된 컴포넌트 사용 : import 없이 사용가능 */}
      <UseComponent2/>
      <UseComponent3/>

      {/** 자식 컴포넌트에 state 변수 전달하기 : 키={변수) 형태*/}
      <UseComponent5 a={state1} b={state2} />
      <UseComponent6 stateArr={state3} />
      <UseComponent7 stateObj={state4} />

      <table border='1'>
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          {state5.map(function(user, index){
            //state5 는 회원 객체 배열
            //회원 객체당 tr태그 1개를 생성, 이를 UseComponent8이 담당
            //UseComponent8 이 tr 내부에 회원 정보를 작성할 때 user 가 필요하므로 전달
            //이 경우는 state5 배열 전체를 전달하는 것이 아니라 map을 통해 추출한 각 객체를 전달하는 것
            return <UseComponent8 key={"user"+index} user={user} />
          })}
        </tbody>
      </table>
      
      {/** 자식 컴포넌트에 state 변수 전달 및 변경 : 변수와 함께 setter 함수도 전달 */}
      <UseComponent9 state1={state1} state2={state2} setState1={setState1} setState2={setState2}/>
      <UseComponent10 stateArr={state3} setState3={setState3}/>
    </>
  )
}

//하나의 jsx 파일 내부에서 여러 컴포넌트 작성 가능
function UseComponent2(){
  return (
    <div>
      <h1>App.jsx의 UseComponent2</h1>
    </div>
  )
}

function UseComponent3(){
  return (
    <div>
      <h1>App.jsx의 UseComponent3</h1>
    </div>
  )
}

//부모로부터 전달받은 매개변수 사용 : props 객체 형태로 저장되어 있음, 추출 시 key는 속성명으로
function UseComponent5(props){
  console.log(props.a); //객체.속성명
  console.log(props.b);
  const a = props.a;
  const b = props.b;
  return (
    <>
      부모가 전달한 a : {a} <br/>
      부모가 전달한 b : {b} <br/>
    </>
  )
}

function UseComponent6(props){
  const stateArr = props.stateArr;
  return (
    <ul>
      {stateArr.map(function(num, index){
        return <li key={"num"+index}>
          {num}
        </li>
      })}
    </ul>
  )
}

function UseComponent7(props){
  const stateObj = props.stateObj;
  return (
    <>
      <table border='1'>
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stateObj.name}</td>
            <td>{stateObj.age}</td>
            <td>{stateObj.addr}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

function UseComponent8(props){
  const user = props.user;
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.addr}</td>
    </tr>
  )
}

function UseComponent9(props){
  const state1 = props.state1;        //부모 컴포넌트에서 정의한 State 변수
  const state2 = props.state2;
  const setState1 = props.setState1;  //부모 컴포넌트에서 정의한 setState 함수
  const setState2 = props.setState2;

  const updState1 = () => {
    setState1('변경된 state1');
  }

  return (
    <div>
      <h3>state1 : {state1} <button onClick={updState1}>state1 변경</button> </h3>
      <h3>state2 : {state2} <button onClick={()=>{setState2(1000);}}>state2 변경</button> </h3>
    </div>
  )
}

function UseComponent10 (props){
  const stateArr = props.stateArr;    //상위 컴포넌트에서 전달받은 state 변수
  const setState3 = props.setState3;  //상위 컴포넌트에서 전달받은 state 변수 변경 함수

  let [stateVal, setStateVal] = useState(''); //input 입력값을 전달, 변경하기 위한 state 변수
  function updStateVal(e){
    setStateVal(e.target.value);
  }

  function updStateArr(){
    let newStateArr = [...stateArr, stateVal];   
    setState3(newStateArr);
    setStateVal('');
  }

  return (
    <>
      <h3>{stateArr}</h3>
      <input type='text' value={stateVal} onChange={updStateVal} /> <button onClick={updStateArr}>stateArr 변경</button>
    </>
  )
}

export default App
