import { useState } from 'react'
//(0) CSS 파일 import
import './user.css';

/*
React 프로젝트를 이용하여, 회원 정보를 출력, 등록, 삭제하는 프로그램을 제작하시오.

프로젝트명 : 03_03_userInfo
프로젝트 요구사항
	- 디자인은 자유롭게 지정하나, 별도의 css 파일을 생성하여 작성할 것. 
	- 회원에 대한 정보는 이름(name), 나이(age), 주소(addr), 성별(gender ['남자' 또는 '여자']), 전화번호(phone)
	- 기본적으로 5명의 회원 정보 객체 배열이 테이블 형식으로 화면에 출력되도록 할 것.
	  테이블 헤더 행의 각 컬럼은 다음과 같다 -> [이름, 나이, 주소, 성별, 전화번호, 삭제]
	- 회원 정보 객체 배열은 App 컴포넌트의 state 변수로 상태를 관리할 것.
	- 정보 등록 요소들은, 기본 회원 정보를 출력하는 table 하단에 작성하고,
    정보 등록 시 입력하는 각 입력값은 state 변수로 상태를 관리할 것.
	- 컴포넌트는 기본적으로 생성되는 App 컴포넌트와, 회원 정보 객체 배열을 테이블 형식으로 출력 시
	  각 행(tr) JSX를 생성하는 User 컴포넌트를 필수적으로 작성하고,
	  동일한 App.jsx 파일내에 작성할 것. (필요 시, 컴포넌트 추가는 가능)
	- 마지막 컬럼(삭제)에는 버튼을 생성하고, 버튼 클릭 시 해당 행 정보를 삭제할 것.
*/


function App() {
  /* (0) CSS
     (1) 회원 정보 출력
     (2) 회원 정보 삭제
     (3) 회원 정보 등록
  */

  //(1-1) 기존 회원 정보 객체 배열 State로 선언
  const [userList, setUserList] = useState([
    { name: "유저1", age: 24, addr: "주소1", gender: "남자", phone: "010-2732-2241" },
    { name: "유저2", age: 27, addr: "주소2", gender: "여자", phone: "010-2674-0093" },
    { name: "유저3", age: 30, addr: "주소3", gender: "여자", phone: "010-3784-2834" },
    { name: "유저4", age: 40, addr: "주소4", gender: "남자", phone: "010-3232-2555" },
    { name: "유저5", age: 50, addr: "주소5", gender: "여자", phone: "010-9845-5454" }
  ]);

  // (3-1) 회원 정보 등록 시, 각 입력값 상태 관리 변수 선언
  const [name, setName]     = useState("");
  const [age, setAge]       = useState("");
  const [addr, setAddr]     = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone]   = useState("");

  // (3-6) 회원 정보 등록 버튼 클릭 시, 동작 함수
  function insertUser() {
    //배열에 추가할 객체 생성
    const user = { name, age, addr, gender, phone }; //key와 value변수명 동일하다면, key:value 형태로 작성하지 않아도 가능.

    //기존 배열 마지막 요소로 추가
    userList.push(user);

    //배열 복사하여 setter 메소드에 전달하여, 재랜더링 유도
    setUserList([...userList]); 

    //사용자 입력값 초기화
    setName("");
    setAge("");
    setAddr("");
    setGender("");
    setPhone("");
  };

  return (
    <div className="wrap">
        <h1>회원 목록 출력</h1>
        <hr></hr>
        <table className="member-wrap">
          <thead>
            <tr>
              <th>이름</th>
              <th>나이</th>
              <th>주소</th>
              <th>성별</th>
              <th>전화번호</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            { //(1-2) 기존 회원 정보 출력
            userList.map(function(item, index) {
              // (1-3) 각 tr JSX를 그릴 User 컴포넌트 호출하며, 출력 시 필요한 user 전달
              // (2-1) 삭제 시, 필요한 State 변수와 변경 호출 함수 전달. userList, setUserList 
              return <User key={"user" + index} user={item} userList={userList} setUserList={setUserList} />;
            })}
          </tbody>
        </table>

        <div className="regist-wrap">
          <h3>회원 정보 등록</h3>
          <hr></hr>
          {/* (3-2) 입력 input을 생성할 컴포넌트 별도 분리하고, State 변수 및 변경 호출 함수 전달.
            -> 03_02 프로젝트 '상품 정보 등록'처럼 onChange에 등록될 핸들러를 각각 생성하지 않아도 됨. */}
          <InputElWrap text="이름" data={name} setData={setName} />
          <InputElWrap text="나이" data={age} setData={setAge} />
          <InputElWrap text="주소" data={addr} setData={setAddr} />
          <InputElWrap text="성별" data={gender} setData={setGender} />
          <InputElWrap text="전화번호" data={phone} setData={setPhone} />
          <button onClick={insertUser}>회원등록</button>
        </div>
    </div>
  );
}

//(1-4) 회원 정보를 그릴 컴포넌트 생성
const User = function(props) {
  const user = props.user;              //(1-5) 출력에 필요한 회원 1명 객체 추출(추출 시, 전달한 key로 추출)

  // (2-2) 삭제 시, 필요한 State 변수와 변경 호출 함수 props에서 추출
  const userList = props.userList;      //부모 컴포넌트 state 변수
  const setUserList = props.setUserList;//부모 컴포넌트 state 변수 변경 호출 함수


  // (2-4) 삭제 버튼 클릭 시, 동작 함수 선언 및 로직 작성
  function deleteUser(){
    // (2-5) 삭제 대상 객체를 제외한 요소들로 구성된 새 배열 생성
    // 또는 부모컴포넌트에서 map 내부 함수 매개변수인, index를 전달하여 splice 처리도 가능
    const newUserList = userList.filter(function(fUser, fIndex){
        return fUser != user;
    });

    // (2-6) setter에 새 배열 전달하여 재랜더링 유도
    setUserList(newUserList);
  }


  //(1-6) 회원 1명 정보 JSX 생성 및 리턴
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.addr}</td>
      <td>{user.gender}</td>
      <td>{user.phone}</td>
      {/* (2-3) 삭제 버튼 생성 및 이벤트 핸들러 연결  */}
      <td><button onClick={deleteUser}>삭제</button></td>
    </tr>
  );
};

// (3-3) 각 입력 input을 생성할 컴포넌트 선언
const InputElWrap = function(props) {
  // (3-4) 화면에 보여줄 텍스트, State 변수, 변경 호출 함수 추출
  const text = props.text;        {/* "이름", "니이", "주소", "성별", "전화번호" */}
  const data = props.data;        {/* 각 State 변수 */}
  const setData = props.setData;  {/* 각 State 변수 변경 시, 호출 함수 */}

  // (3-5) input 입력 요소에 값의 변화가 생길 때, 호출되는 함수
  const changeInputValue = function(e) {
    setData(e.target.value);  //전달 받은 State 변경 함수에 입력값 전달
  };

  return (
    <div className="input-wrap">
      <label>{text}</label>
      <input type="text" value={data} onChange={changeInputValue} />
    </div>
  );
};

export default App
