import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //기존 회원 리스트
  let [userList, setUserList] = useState([
    {name:'유저1', age:10, addr:'서울'},
    {name:'유저2', age:20, addr:'경기'},
    {name:'유저3', age:30, addr:'대전'},
    {name:'유저4', age:40, addr:'대구'},
    {name:'유저5', age:50, addr:'부산'},
  ])

  //회원정보 등록 - JS 방식
  function regUser1(){
    //사용자가 input 에 입력한 값 가져오기
    let nameInput = document.getElementById('name');  //id가 'name' 인 요소 객체
    let ageInput = document.getElementById('age');
    let addrInput = document.getElementById('addr');

    let nameVal = nameInput.value;  //해당 객체의 값들 중 input 태그에 입력한 값
    let ageVal = ageInput.value;
    let addrVal = addrInput.value;
    
    let tdEl1 = document.createElement('td'); //td 태그 요소 만들기
    let tdTextNode1 = document.createTextNode(nameVal); //td 태그에 넣을, 사용자가 입력한 이름 값
    tdEl1.appendChild(tdTextNode1); //td태그의 마지막 자식으로 이름 값을 넣음 : <td>입력한 이름 값</td>

    let tdEl2 = document.createElement('td');
    let tdTextNode2 = document.createTextNode(ageVal);
    tdEl2.appendChild(tdTextNode2);

    let tdEl3 = document.createElement('td');
    let tdTextNode3 = document.createTextNode(addrVal);
    tdEl3.appendChild(tdTextNode3);

    let tdEl4 = document.createElement('td');
    let gbText = '';
    if(ageVal <= 13){
      gbText = '초등학생';
    } else if(ageVal <= 20){
      gbText = '미성년자';
    } else if(ageVal <= 34){
      gbText = '청년';
    } else if(ageVal <= 65){
      gbText = '중년'
    } else {
      gbText = '노인'
    }
    let tdTextNode4 = document.createTextNode(gbText);
    tdEl4.appendChild(tdTextNode4);

    let trEl = document.createElement('tr');
    trEl.appendChild(tdEl1);
    trEl.appendChild(tdEl2);
    trEl.appendChild(tdEl3);
    trEl.appendChild(tdEl4);
    
    let tbody = document.getElementsByTagName('tbody')[0];  //본문에 있는 tbody 태그들을 배열로 반환해, 0번째 인덱스 요소를 가져옴
    tbody.appendChild(trEl);
  }


  function regUser2(){
    let nameInput = document.getElementById('name');
    let ageInput = document.getElementById('age');
    let addrInput = document.getElementById('addr');

    let nameVal = nameInput.value;  
    let ageVal = ageInput.value;
    let addrVal = addrInput.value;

    let newUser = {name:nameVal, age:ageVal, addr:addrVal}; //입력한 값을 객체로 생성
    let newUserList = [...userList];  //새로운 배열 생성 : 기존 배열 깊은 복사
    newUserList.push(newUser);  //생성한 신규회원 객체를 새로운 배열에 추가
    
    setUserList(newUserList); //세터 함수를 통해 기존 배열을 새로운 배열로 갱신, 컴포넌트 재렌더링
  }


  function regUser3(){
    let nameInput = document.getElementById('name');
    let ageInput = document.getElementById('age');
    let addrInput = document.getElementById('addr');

    let nameVal = nameInput.value;  
    let ageVal = ageInput.value;
    let addrVal = addrInput.value;

    let newUser = {name:nameVal, age:ageVal, addr:addrVal};
    let newUserList = [...userList, newUser]; //깊은 복사+마지막 요소로 추가
    
    setUserList(newUserList);

    //setUserList([...userList, {name:nameVal, age:ageVal, addr:addrVal}]); : 1줄로 줄이기, 다만 시인성이 떨어짐
  }


  //회원정보 등록 - React State : 직접적으로 document에 접근하지 않음 (react에서는 직접 접근을 지양함)
  let [name, setName] = useState(""); //초기값 빈 문자열
  function updName(e){ //이름 input 태그의 입력값 변화가 일어날 때 호출될 함수 (onChange), e는 이벤트 정보를 가지고 있는 객체
    let nameVal = e.target.value; //현재 이벤트가 일어난 객체의 value 값을 저장
    setName(nameVal); //name값을 변화시킴
  }

  let [age, setAge] = useState(10);
  function updAge(e){
    let ageVal = e.target.value;
    setAge(ageVal);
  }

  let [addr, setAddr] = useState("");
  function updAddr(e){
    let addrVal = e.target.value;
    setAddr(addrVal);
  }

  function regUser4(){
    let newUser = {name:name, age:age, addr:addr};  //위에서 선언했던 useState의 변수들을 그대로 사용
    let newUserList = [...userList, newUser];
    setUserList(newUserList);
  }


  return (
   <div>
    <table border='1'>
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
          <th>주소</th>
          <th>분류</th>
          <th>삭제버튼(splice)</th>
          <th>삭제버튼(filter)</th>
        </tr>
      </thead>
      <tbody>
        {userList.map(function(user, index){  //맵 함수

          //splice를 이용한 회원 삭제
          function delUserSplice(){
            /*
            splice : 원본에 영향을 미치는 함수, 특정 위치의 요소를 수정, 삭제, 추가 가능

            배열에서 수정 : 배열.splice(수정할 인덱스 번호, 1, 수정할 데이터) : 인덱스 번호부터 1개를 수정
            배열에서 추가 : 배열.splice(추가할 인덱스 번호, 0, 추가할 데이터) : 해당 위치에 데이터 추가
            배열에서 삭제 : 배열.splice(삭제할 인덱스 번호, 1) : 해당 인덱스의 데이터 삭제
            */

            userList.splice(index, 1);  //전달받은 인덱스의 값 1개를 삭제
            setUserList([...userList]);
          }

          //filter를 이용한 회원 삭제 : 조건을 만족하는 요소만 추출 - 배열의 길이가 달라질 수 있음
          function delUserFilter(){
            let newUserList = userList.filter(function(filterUser, filterIndex){
              return user != filterUser;
            });

            setUserList(newUserList);
          }

          
          return <tr key={'user'+index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.addr}</td>
                  <td>
                    {user.age <= 13 ? '초등학생' :  
                     user.age <= 20 ? '미성년자' :  //false 일 경우에 한번 더 삼항연산자 사용
                     user.age <= 34 ? '청년' :
                     user.age <= 65 ? '중년' :
                     '노인'}
                  </td>
                  <td>
                    <button onClick={delUserSplice}>삭제(splice)</button>
                  </td>
                  <td>
                    <button onClick={delUserFilter}>삭제(filter)</button>
                  </td>
          </tr>
        })}
      </tbody>
    </table>

    <hr/>

    <div className='reg-wrap'>
      <label htmlFor='name'>이름</label>
      <input type='text' id='name' name='name' value={name } onChange={updName}/> 
    </div>

    <div>
      <label htmlFor='age'>나이</label>
      <input type='text' id='age' name='age' value={age} onChange={updAge}/>
    </div>

    <div>
      <label htmlFor='addr'>주소</label>
      <input type='text' id='addr' name='addr' value={addr} onChange={updAddr}/>
    </div>    

    <div>
      <button onClick={regUser1}>회원정보 등록 1 : JS방식</button><br/>
      <button onClick={regUser2}>회원정보 등록 2 : useState 방식</button><br />
      <button onClick={regUser3}>회원정보 등록 3 : useState 방식 간소화</button><br />
      <button onClick={regUser4}>회원정보 등록 4 : React State</button><br />
    </div>


   </div>
  )
}

export default App
