import { validateFlags, validatePlay } from "../../assets/validatePlay";
import useStore from "../../hooks/useStore";

interface Props{
  row: number,
  col: number,
  bool: boolean,
  value: number,
}

const mine = '💣';
const flag = '🚩';

function Cell(props:Props) {
  const {row,col,bool,value} = props;
  const flagsPosition = useStore(st=>st.flags);
  const {table,mines,visibility,flags,win,lose,setVisibility,setFlags,setLose,setWin} = useStore(st=>st);

  const styleCell = bool ? ' show-cell' : ' no-show-cell';
  const showFlag = flags.some(([r,c])=> +r===+row && +c===+col)

  const handleLeftClick = ()=>{
    if(bool || win || lose) return;
    const nextPlay= validatePlay(flagsPosition,mines,table,visibility,[row,col])
    
    //@ts-ignore
    if(nextPlay.lose) setLose(true);
    //@ts-ignore
    setVisibility(nextPlay.boolTable);
    //@ts-ignore
    setFlags(nextPlay.flagsPosition);
  }

  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    if(win || lose) return;
    const canPutFlag = !visibility[row][col]; 
    if(canPutFlag) {
      const newFlags = validateFlags(mines,flags,[row,col]);
      setFlags(newFlags.flagsPos)
      if(newFlags.win) setWin(true);
      if(newFlags.lose) setLose(true);
    }
  }

  return (
    <button
      className={"cell-board "+ styleCell }
      onClick={()=>handleLeftClick()}
      onContextMenu={(e)=>handleRightClick(e)}

    > {
        showFlag
          ? flag
          : bool 
            ? value < 0 
              ? mine 
              : value 
                ? value 
                : ''  
            : ''
        // value
      }
    </button>
  );
}

export default Cell;