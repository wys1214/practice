import { useState } from 'react'

export default function InputComponent(prop){
    const state = prop.state;
    const setState = prop.setState;

    const [name, setName] = useState("");
    const [game, setGame] = useState("");
    const [from, setFrom] = useState("");

    function inputNameVal(e){
    const name = e.target.value;
    setName(name);
    }

    function inputGameVal(e){
    const game = e.target.value;
    setGame(game);
    }

    function inputFromVal(e){
    const from = e.target.value;
    setFrom(from);
    }

    function inputNewUser(){
        const newState = [...state, {name:name, game:game, from:from}];
        setState(newState);
        setName("");
        setGame("");
        setFrom("");
    }

    return (
       <div>
        <label htmlFor='inputName'>NAME</label>
        <input type='text' id='inputName' value={name} onChange={inputNameVal}/><br/>
        <label htmlFor='inputGame'>GAME</label>
        <input type='text' id='inputGame' value={game} onChange={inputGameVal}/><br/>
        <label htmlFor='inputFrom'>FROM</label>
        <input type='text' id='inputFrom' value={from} onChange={inputFromVal}/><br/>
        <button onClick={inputNewUser}>INPUT NEW USER</button>
      </div>
    )
}