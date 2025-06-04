import { useState } from 'react'

export default function RegisterGame(props){
    const gameList = props.gameList;
    const setGameList = props.setGameList;
    const [gameNo, setGameNo] = useState("");
    const [gameName, setGameName] = useState("");
    const [gamePrice, setGamePrice] = useState("");
    const [gameStar, setGameStar] = useState("");

    const registerGameNo = (e) => {
        setGameNo(e.target.value);
    }
    const registerGameName = (e) => {
        setGameName(e.target.value);

    }
    const registerGamePrice = (e) => {
        setGamePrice(e.target.value);

    }
    const registerGameStar = (e) => {
        setGameStar(e.target.value);

    }
    const registerGame = () => {
        const newGame = {
            gameNo, gameName, gamePrice, isCleared:false, star:gameStar
        }
        setGameList([...gameList, newGame]);
        setGameNo("");
        setGameName("");
        setGamePrice("");
        setGameStar("");
    }

    return(
      <div>
        <div>
          <label htmlFor='gameNo'>Game Number</label>
          <input type='text' id='gameNo' value={gameNo} onChange={registerGameNo} />
        </div>
        <div>
          <label htmlFor='gameName'>Game Name</label>
          <input type='text' id='gameName' value={gameName} onChange={registerGameName} />
        </div>
        <div>
          <label htmlFor='gamePrice'>Game Price</label>
          <input type='text' id='gamePrice' value={gamePrice} onChange={registerGamePrice} />
        </div>
        <div>
          <label htmlFor='gameStar'>Game Star</label>
          <input type='text' id='gameStar' value={gameStar} onChange={registerGameStar} />
        </div>
        <button onClick={registerGame}>Register</button>
      </div>
    )
}