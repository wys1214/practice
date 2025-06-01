import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [list, setList] = useState([
    {name:'Chosen Undead', game:'Dark Souls', from:'Astora', year:2011},
    {name:'Bearer of the Curse', game:'Dark Souls 2', from:'Drangleic', year:2014},
    {name:'Ashen One', game:'Dark Souls 3', from:'Lothric', year:2016}
  ]);

  let [name, setName] = useState("");
  function insertName(e){
    let nameVal = e.target.value;
    setName(nameVal);
  }

  let [game, setGame] = useState("");
  function insertGame(e){
    let gameVal = e.target.value;
    setGame(gameVal);
  }

  let [from, setFrom] = useState("");
  function insertFrom(e){
    let fromVal = e.target.value;
    setFrom(fromVal);
  }

  let [year, setYear] = useState(0);
  function insertYear(e){
    let yearVal = e.target.value;
    setYear(yearVal);
  }

  function insertUser(){
    let newUser = {name:name, game:game, from:from, year:year};
    /*
    setList(list => [...list, newUser])
    */
    let newList = [...list, newUser]
    setList(newList);
  }

  return (
    <div>

      <table border='1'>

        <thead>
          <tr>
            <th>NAME</th>
            <th>GAME</th>
            <th>FROM</th>
            <th>YEAR</th>
            <th>Delete(splice)</th>
            <th>Delete(filter)</th>
          </tr>
        </thead>

        <tbody>
          {list.map(function(user, index){  //화살표 함수로 변경 시 .map((user, index) => (<tr key='user'+index> ...)))
            
              function spliceDelete(){
                let newList = [...list];
                newList.splice(index, 1);
                setList([...newList]);
              }

              function filterDelete(){  
                let newList = list.filter(filterUser => user != filterUser);
                /*  화살표 함수 미사용시
                let newList = list.filter(function(filterUser){
                  return user != filterUser;
                });
                */
                setList(newList);
              }

            return <tr key={'user'+index}>
              <td>{user.name}</td>
              <td>{user.game}</td>
              <td>{user.from}</td>
              <td>
                {user.year <= 2010 ? 'Before 2010' :
                 user.year <= 2015 ? 'Before 2015' :
                 user.year <= 2020 ? 'Before 2020' :
                 'After 2020'}
              </td>
              <td>
                <button onClick={spliceDelete}>Splice Delete</button>
              </td>
              <td>
                <button onClick={filterDelete}>Filter Delete</button>
              </td>
            </tr>
          })}
        </tbody>

      </table>

      <hr/>

      <div>
        <label htmlFor='insertName'>NAME</label>
        <input type='text' id='insertName' name='insertName' value={name} onChange={insertName}/><br/>

        <label htmlFor='insertGame'>GAME</label>
        <input type='text' id='insertGame' name='insertGame' value={game} onChange={insertGame}/><br/>

        <label htmlFor='insertFrom'>FROM</label>
        <input type='text' id='insertFrom' name='insertFrom' value={from} onChange={insertFrom}/><br/>

        <label htmlFor='insertYear'>YEAR</label>
        <input type='text' id='insertYear' name='insertYear' value={year} onChange={insertYear}/><br/>

        <button onClick={insertUser}>Insert User : React</button>
      </div>

    </div>
  )
}

export default App
