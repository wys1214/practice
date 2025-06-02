import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './todo.css'


function App() {
//todoList 복습

const [todoList, setTodoList] = useState([
  {isLike:false, todoContent:'할 일 1', regDate:'2025-05-25', isDone:true},
  {isLike:true, todoContent:'할 일 2', regDate:'2025-05-26', isDone:true},
  {isLike:false, todoContent:'할 일 3', regDate:'2025-05-27', isDone:false},
  {isLike:true, todoContent:'할 일 4', regDate:'2025-05-28', isDone:true},
  {isLike:false, todoContent:'할 일 5', regDate:'2025-05-29', isDone:false}
])

const [text, setText] = useState("");

const inputText = (e) => {
  let text = e.target.value;
  setText(text);
}

const updateTodoList = () => {
  let isLike = false;
  let todoContent = text;
  let isDone = false;

  let today = new Date();
  let year = String(today.getFullYear());
  let monthStr = String(today.getMonth()+1);
  let month = String(monthStr.length<2 ? '0'+monthStr : monthStr)
  let dateStr = String(today.getDate());
  let date = String(dateStr.length<2 ? '0'+dateStr : dateStr)

  let regDate = year+'-'+month+'-'+date;

  let newTodo = {isLike, todoContent, regDate, isDone}
  let newTodoList = [...todoList, newTodo];

  setTodoList(newTodoList);
  setText("");
}

const like = (index) => {
  let newTodoList = [...todoList];
  newTodoList[index].isLike = !newTodoList[index].isLike
  setTodoList(newTodoList);
}

const done = (index) => {
  let newTodoList = [...todoList];
  newTodoList[index].isDone = true;
  setTodoList(newTodoList);
}

const deleteTodo = (index) => {
  let newTodoList = [...todoList];
  newTodoList.splice(index, 1);
  setTodoList(newTodoList);
}

  return (
    

    <div className='todo-wrap'>
      <div className='todo-header'>
        <h1>Todo List 복습</h1>
      </div>
      <div className='todo-content'>
        <div className='input-box'>
          <input type='text' value={text} onChange={inputText}/>
          <button onClick={updateTodoList}>등록</button>
        </div>
        <div>
          {todoList.map((todo, index) => {
          return <ul className='todo' key={"todo"+index}>
              <li className='todo-like'>
                {todo.isLike ? <span onClick={() => like(index)}>❤</span> : <span onClick={() => like(index)}>🤍</span>}
              </li>
              <li className={todo.isDone ? 'todo-text todo-done' : 'todo-text' }>{todo.todoContent}</li>
              <li className='todo-date'>{todo.regDate}</li>
              <li className='todo-btn'>
                <span  onClick={() => deleteTodo(index)}>❌</span>
                {todo.isDone ? '' : <span onClick={() => done(index)}>✔</span>}
              </li>
          </ul>
          })}
        </div>
      </div>
      
    </div>
  )
}

export default App
