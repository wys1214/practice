import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './Game'
import RegisterGame from './RegisterGame'

function App() {

  const [gameList, setGameList] = useState([
    {
      gameNo : 1,
      gameName : 'Dark Souls',
      gamePrice : '43,800',
      isCleared : true,
      star : 3
    },
    {
      gameNo : 2,
      gameName : 'Dark Souls 2',
      gamePrice : '49,800',
      isCleared : false,
      star : 2
    },
    {
      gameNo : 3,
      gameName : 'Dark Souls 3',
      gamePrice : '71,000',
      isCleared : true,
      star : 5
    }
  ])

  return (
    <div>
      <div>Register Game</div>
      <div>
        {gameList.map(function(item, index){
          return <Game key={'item'+index} game={item} gameList={gameList} setGameList={setGameList}/>
        })}
      </div>
      <RegisterGame gameList={gameList} setGameList={setGameList}/>  
    </div>
  )
}

export default App
