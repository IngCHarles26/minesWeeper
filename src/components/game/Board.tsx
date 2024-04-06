import './board.css';
import useStore from "../../hooks/useStore";
import Crono from "./Crono";
import Row from './Row';
import { minesWeeper } from '../../assets/tableGenerator';


function Board() {
  const {table,visibility,mines,flags,win,lose,difficulty,customValues,setPage,setWin,setLose,setFlags,setTable,setMines,setVisibility,resetCount} = useStore(st=>st);
  
  const handleButton = ()=>{
    setPage(0);
    setWin(false);
    setLose(false);
    setFlags([]);
  }

  const handleReset = ()=>{
    setWin(false);
    setLose(false);
    setFlags([]);
    const {rows:_rows,columns:_columns,mines:_mines} = customValues;
    //@ts-ignore
    const newTable = minesWeeper(difficulty,_rows,_columns,_mines);
    setTable(newTable.table);
    setMines(newTable.minesPos);
    setVisibility(newTable.visibility);
    resetCount();
  }

  return (
    <div className="Board">
      <div className='nav-board'>
        <nav>
          <button
            onClick={()=>handleButton()}
          >{difficulty.toUpperCase()}</button>
          <Crono />
          <p>🚩 {mines.length-flags.length}</p>
        </nav>
      </div>

      <div className='mines-board'>
        <div 
          className='container-mines-board'
          style={{opacity: (win || lose) ? '0.5' : '1'}}
          >
          {
            table.map( (row:number[],ix:number) => (
              <Row
                key={'Row'+ix+row}
                bool={visibility[ix]}
                row={+ix}
                value={row}
              />
              ))
          }
        </div>
      </div>

      <div className='message-end-game'>
        {win && <p>Congratulations</p>}
        {lose && <p>Ups</p>}
        {(win || lose) && <button onClick={()=>handleReset()}>RESET</button>}
      </div>

    </div>
  );
}

export default Board;
