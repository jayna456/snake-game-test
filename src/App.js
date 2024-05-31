import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [matrix, setMatrix] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [intervalId, setIntervalId] = useState();
  // Create the snake
  const [snake,setSnake] = useState([[1, 1],[2,1],[3,1],[4,1]]);

  // Create the diamond
  const [diamond,setDiamond] = useState([Math.floor(Math.random() * 20), Math.floor(Math.random() * 10)]);

  // Create the player
  const [player, setPlayer] = useState([Math.floor(Math.random() * 20), Math.floor(Math.random() * 10)]);

  useEffect(() => {
    const matrixArray = createarray1(10,20);
    setMatrix(matrixArray);
  },[])
  
  useEffect(() => {
    if(isStart === true) {
      const head = snake[0];
      const newHead = [head[0] + 1, head[1]];
      if (newHead[0] >= 24) {
        const newArray = [[1, 3],[2,3],[3,3],[4,3]];
        setSnake([...newArray]);
      }
      const refreshId = setInterval(moveSnake, 1000);
      setIntervalId(refreshId);
    } else {
      clearInterval(intervalId);
    }
  }, [isStart])

  let createarray1 = function(rowCount, colCount){
    let myarr = [];
    for(let i=0; i < rowCount; i++){
      let row = []
      for(let j=0; j < colCount; j++){
        let col = j+1;
        row.push(col);
      }
      myarr.push(row);
    }
    return myarr;
  }

  // Move the snake
  function moveSnake() {
    const head = snake[0];
    const newHead = [head[0] + 1, head[1]];

    snake.unshift(newHead);

    // Check if the snake has eaten the diamond
    if (newHead[0] === diamond[0] && newHead[1] === diamond[1]) {
      // Create a new diamond
      diamond = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 10)];
      setDiamond([...diamond]);
    } else {
      // Remove the tail of the snake
      snake.pop();
    }
    setSnake([...snake])
  }

  return (
    <div className="App">
      <button className='btn' onClick={() => setIsStart(!isStart)}>{isStart ? 'STOP' : 'START'}</button>
      <table>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i} className="row">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={snake.some(([x, y]) => x === j && y === i) ? "sneak" : diamond[0] === j && diamond[1] === i ? "diamond" :
                    player[0] === j && player[1] === i ? "player" : "cell"}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
