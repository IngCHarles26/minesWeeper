import './board.css';
import useStore from "../../hooks/useStore";
import Crono from "./Crono";
import Row from './Row';


function Board() {
  const {table,visibility,mines,flags,win,lose,difficulty,setPage,setWin,setLose} = useStore(st=>st);
  
  const handleButton = ()=>{
    setPage(0);
    setWin(false);
    setLose(false);
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

    </div>
  );
}

export default Board;