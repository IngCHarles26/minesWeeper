export function validatePlay(
  flagsPosition: [number,number][],
  minesPosition: [number,number][],
  table: number[][],
  visibility: boolean[][],
  clickPosition: [number,number],
){
  const [ rowPlay, colPlay] = clickPosition;
  const [ lenRow, lenCol] = [ table.length, table[0].length]
  let boolTable = [...visibility]
  let [win,lose] = [false,false];
  let message = 'No valid Play';
  
  //click en una casilla que ya está visible
  const isPlayVisible = boolTable[rowPlay][colPlay];
  const isInFlagPosition = flagsPosition.some( ([r,c]) => r === rowPlay && c === colPlay);
  if( isPlayVisible  || isInFlagPosition) return { message, boolTable, flagsPosition, win, lose }
  
  const playValue = table[rowPlay][colPlay];
  //click en una mina
  if(playValue < 0) {  
    message = 'Tray again';
    boolTable[rowPlay][colPlay] = true;
    lose = true;
    
    return { message, boolTable, flagsPosition, win, lose,minesPosition}
  }
  
  //click en una pista
  if(playValue > 0){
    message = 'next play';
    boolTable[rowPlay][colPlay] = true;
    
    return { message, boolTable, flagsPosition, win, lose}
  }
  
  //click en un espacio facio
  if(playValue === 0){
    const aroundPos = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let posToVisible:[number,number][] = [];
    
    const getAllEmpty = (_row:number,_col:number) => {
      posToVisible.push([_row,_col])  
      if(table[_row][_col]) return;
      
      aroundPos
        .filter(([r,c]) => {
          const [ sumRow, sumCol] = [ +r+_row, +c+_col];
          return !posToVisible.some(([_r,_c]) => sumRow===+_r && sumCol===+_c)
        })
        .forEach( ([r,c]) => {
          const [ sumRow, sumCol] = [ +r+_row, +c+_col];
          const validateRow = 0 <= sumRow && sumRow < +lenRow;
          const validateCol = 0 <= sumCol && sumCol < +lenCol;
          if(validateCol && validateRow) getAllEmpty(sumRow,sumCol);
        })
    }
    getAllEmpty(rowPlay,colPlay);
    
    posToVisible.forEach( ([r,c]) => boolTable[r][c] = true);
    flagsPosition = flagsPosition.filter(([r,c])=>!posToVisible.some(([_r,_c])=> r===_r && c===_c))
    
    return { message, boolTable, flagsPosition, win, lose}    
  }
  
}


export function validateFlags(
  minesPosition:number[][],
  flagsPosition:[number,number][],
  clickPosition:[number,number],
){
  const lenMines = minesPosition.length;
  const [ row , col ] = clickPosition;
  let [ win , lose ] = [ false , false];
  let flagsPos = [ ...flagsPosition ];
  let ix = flagsPos.findIndex( ([r,c]) => row === r && col === c);
  
  if(ix<0){
    flagsPos.push( clickPosition );
  }else{
    flagsPos.splice(ix,1)
  }
  const  lenFlags = flagsPos.length ;
  
  if(lenFlags === lenMines){
    win = minesPosition.every( ([r,c] ) => flagsPos.some( ([_r,_c]) => _r === r && _c === c)) 
    lose = !win;
    return {flagsPos , win, lose}
  }
  
  return {flagsPos,win,lose}
}
