export default function Game(props){
    const game = props.game;
    const gameList = props.gameList;
    const setGameList = props.setGameList;

    function IsCleared(){
        game.isCleared = !game.isCleared;
        setGameList([...gameList]);
    }   

    return(
        <ul>
            <li>Game Number : {game.gameNo}</li>
            <li>Game Name : {game.gameName}</li>
            <li>Game Price : {game.gamePrice}</li>
            <li>{game.isCleared ? <span onClick={IsCleared}>✅</span> : <span onClick={IsCleared}>❌</span>}</li>
            <li><StarRate star={game.star}/></li>
        </ul>
    )
}

function StarRate(props){
    const star = props.star;
    const starArr = new Array();
    for(let i=0;i<star;i++){
        starArr.push(
            <span key={'star'+i}>⭐</span>
        )
    }
    return (
        <>{starArr}</>
    )
}