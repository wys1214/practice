import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './todo.css'

function App() {

  //기존 todo-list 객체 배열
  /**
   * isLike : 좋아요 여부 (t:좋아요, f:좋아요 취소)
   * todoContent : 할 일 명칭
   * regDate : 등록일자
   * isDone : 할 일 완료 여부(t:완료, f:미완료)
   */
  let [todoList, setTodoList] = useState([
    {isLike:false, todoContent:'할 일 1', regDate:'2025-04-20', isDone:true},
    {isLike:true, todoContent:'할 일 2', regDate:'2025-05-15', isDone:false},
    {isLike:true, todoContent:'할 일 3', regDate:'2025-03-20', isDone:true},
    {isLike:false, todoContent:'할 일 4', regDate:'2025-06-02', isDone:true},
    {isLike:true, todoContent:'할 일 5', regDate:'2025-07-22', isDone:false}
  ]);

  //사용자 입력값을 저장할 State 변수값 선언
  let [text, setText] = useState("");
  function updText(e){
    let todoText = e.target.value;
    setText(todoText);  
  }

  //할 일 등록
  function insertTodo(){
    let isLike = false; //기본값 false
    let todoContent = text; //위에서 선언한 text 사용, 사용자가 입력한 값을 가지고 있음
    let isDone = false; //기본값 false
    
    let today = new Date(); //Date 내장 객체 생성
    let year = String(today.getFullYear()); //연도 정보 추출
    let monthStr = String(today.getMonth()+1); //1~12문자열 생성
    let month = monthStr.length<2 ? "0"+monthStr : monthStr;  //길이가 2보다 짧을 때 앞에 0을 삽입해 2자리로 
    let dayStr = String(today.getDate());
    let day = dayStr.length<2? "0"+dayStr : dayStr;
    let regDate = year+"-"+month+"-"+day;

    //속성값, 속성명이 같을 때에는 한 번만 작성해도 무방
    let todo = {isLike, todoContent, regDate, isDone}
    
    let newTodoList = [...todoList, todo];  //할 일이 추가된 새 배열
    setTodoList(newTodoList);
    setText("");  //입력칸 빈 문자열로
  }

  //JSX문 외부에서 삭제 함수 선언
  function deleteTodo(index){
    // todoList.splice(index, 1);
    // setTodoList([...todoList]);
    d
    const newTodoList = todoList.filter(function(todo, newIndex){
      return index != newIndex; //매개변수로 index를 받아옴 : 필터된 새 배열은 해당 인덱스를 제외한 배열, 즉 index와 newIndex가 일치하지 않는 요소들만 추출
    });
    setTodoList(newTodoList);
  }

  return (
    <div className='todo-wrap'>
      <div className='todo-header'>
        <h1>Todo List</h1>
      </div>
      <div className='todo-content'>
        <div className='input-box'>
          <input type='text' name='todo-text' value={text} onChange={updText} />
          <button onClick={insertTodo}>등록</button>
        </div>
        {todoList.map(function(todo, index){

          /*
          //좋아요 해제
          function like1(){
            todoList[index].isLike=false; //해당 index 번째의 isLike 속성값을 false로 변경
            setTodoList([...todoList]);
          }

          //좋아요 등록
          function like2(){
            todoList[index].isLike=true; //해당 index 번째의 isLike 속성값을 true로 변경
            setTodoList([...todoList]);
          }
          */

          //좋아요 통합 처리
          function like(){
            todoList[index].isLike = !todoList[index].isLike; //각 boolean 값을 반전시킴
            setTodoList([...todoList]);
          }

          //완료여부 통합 처리
          function done(){
            todoList[index].isDone = true;  //false일 경우에만 아이콘이 나타나므로 true로 바꿔줌
            setTodoList([...todoList]);
          }

          /*
          //할 일 삭제
          function deleteTodo(){
            todoList.splice(index, 1);
            setTodoList([...todoList]);
          }
          */

          return <ul key={"todo"+index} className='todo'>
            <li className='todo-like'>
              {todo.isLike ? <span onClick={like}>♥</span> : <span onClick={like}>♡</span> /*isLike 자체가 boolean 값이기 때문에 == 가 없어도 됨*/}
            </li>
            <li className={todo.isDone ? 'todo-text todo-done' : 'todo-text'}>{todo.todoContent}</li>
            <li className='todo-date'>{todo.regDate}</li>
            <li className='todo-btn'>
              <span className='delete' onClick={() => deleteTodo(index) /** onClick={function(e){deleteTodo(index)}} */}>❌</span>
              {todo.isDone ? '' : <span className='done' onClick={done}>✅</span> /** 완료 여부를 체크하기 위한 아이콘 : 미완료시만 출력 */}
            </li>
          </ul>
        })}
      </div>
    </div>
  )
}

export default App
