import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import './App.css';
import Square from './components/Square';

const initialState = [ "", "", "", "", "", "", "", "", "" ]

function App() {
  const [gameState, SetGameState] = useState(initialState);
  const [steps, setSteps] = useState(0)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    checkForWinner(gameState)
  },[gameState]);

  const onClickHandler = (event) => {
    const copyofGameState = [...gameState]
    if(!event.target.innerText){
      copyofGameState[event.target.id] = steps%2==0 ? "X" : "O";
      setSteps(steps + 1)
      SetGameState(copyofGameState)
    }
  };

  const restartGame = () => {
    SetGameState(initialState)
    setSteps(0);
    setWinner(null);
  };
  const checkForWinner = (gameState) => {
    const winningConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [2,4,6],
      [0,4,8],
    ]
    winningConditions.forEach(condition => {
      const [a, b, c] = condition;
      if(gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]){
          setWinner(gameState[a])
          console.log("winner >> ", gameState[a])
      }
    })
  }
  return (
    <>
    <div className="container">
      <div className="left-wrapper">
        <div className="left-text">Let's play tic-toc-toe</div>
        <div className="btn" onClick={restartGame}>Start a new game</div>
      </div>
      {!winner && steps < 9 && (<div className="right-wrapper">
        <div className="players">
          <div className={`player ${steps%2===0 && "player-x"}`}>Player X</div>
          <div className={`player ${steps%2===1 && "player-o"}`}>Player O</div>
        </div>
        <div className="game-wrapper" onClick={onClickHandler}>
          <Square id = {0} state={gameState[0]} className='border-right-bottom' />
          <Square id = {1 } state={gameState[1]} className='border-right-bottom'/>
          <Square id = {2} state={gameState[2]} className='border-bottom' />
          <Square id = {3} state={gameState[3]} className='border-right-bottom'/>
          <Square id = {4} state={gameState[4]} className='border-right-bottom'/>
          <Square id = {5} state={gameState[5]} className='border-bottom'/>
          <Square id = {6} state={gameState[6]} className='border-right'/>
          <Square id = {7} state={gameState[7]} className='border-right'/>
          <Square id = {8} state={gameState[8]} />
        </div>
      </div>

      )}
      {(winner || steps === 9) && (<div className='winner-eventWrapper'>
        <img src={require('./components/logo.png')} width={120} height={100}  />
        <div className="winner-text">{steps===9 && !winner ? 'Its a draw' : ` ${winner} Wins!`}
        </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
