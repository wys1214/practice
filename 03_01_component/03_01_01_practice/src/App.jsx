import { useState } from 'react'
import './App.css'
import InputComponent from './InputComponent'
import UserComponent from './UserComponent'

function App() {

  const [state, setState] = useState([
    {name:'Chosen Undead', game:'Dark Souls', from:'Lordran'},
    {name:'Bearer of the Curse', game:'Dark Souls 2', from:'Drangleic'},
    {name:'Ashen One', game:'Dark Souls 3', from:'Lothric'}
  ])

  return (
    <>
      <div>
        <table border='1'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>GAME</th>
              <th>FROM</th>
            </tr>
          </thead>
          <tbody>
            {state.map(function(user, index){
              return <UserComponent key={'user'+index} user={user} />
            })}
          </tbody>
        </table>
      </div>
      <InputComponent state={state} setState={setState}/>
    </>
  )
}
  
export default App
