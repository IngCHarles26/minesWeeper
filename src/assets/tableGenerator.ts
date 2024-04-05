//get random number between 2 inputs
const randNum = ( min:number , max:number ) => Math.round(Math.random() * (max - min)) + min;

//get table 
function genTable(
  row:number,
  col:number,
  mines:number ){
  
    const roundPos = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const visibility:boolean[][] = Array.from({ length:row } , () => Array( col ).fill(false));
  
    let table:number[][] = Array.from({ length: row+2 } , () => Array( col+2 ).fill(0));
    let minesPos: [number,number][] = [];
    let _row:number,_col:number;
    
    //gen random mines positions 
    for(let ix=0; ix<mines;ix++){
      do{  
        [_row,_col] = [randNum(1,row),randNum(1,col)];
      } while(minesPos.some(el=> !(el[0]-_row) && !(el[1]-_col)))
      minesPos.push([_row,_col])
    }
  
    //gen numbers about near mines
    for(let el of minesPos){
      _row = el[0];
      _col = el[1];
      roundPos.forEach(elR => table[_row + elR[0]][_col + elR[1]]++ )
    }
    
    //ubicate the mines in the table
    minesPos.forEach(el=>{
      table[el[0]][el[1]] = -1;
    })
    
    //cut the limits
    table = table.slice(1,-1).map(el=>el.slice(1,-1))
    minesPos = minesPos.map(([row,col])=>[row-1,col-1])
  
    return { table , minesPos , visibility }
}

export function minesWeeper(
  difficulty: 'easy' | 'medium' | 'hard' | 'custom',
  row:number,
  col:number,
  mines:number ){
  
    const {min,max,round} = Math;
    const maxV = {row:20, col:40, mines:200};
    const minV = {row:5, col:5, mines:5};
    
    const params = {
      easy: {row: 9, col: 9, mines: 10},
      medium: {row: 16, col: 16, mines: 40},
      hard: {row: 24 , col: 30, mines: 80},
      custom: {row, col, mines},
    };
  
    let {row:_row,col:_col,mines:_mines} = params[difficulty];

    if(difficulty === 'custom'){
      _row = min(maxV.row,max(_row,minV.row));
      _col = min(maxV.col,max(_col,minV.col));
      _mines = min(maxV.mines,max(_mines,minV.mines));
    }

    const maxMines = round(_row * _col * 0.4);
    
    _mines = maxMines >= _mines ? _mines : maxMines; 
      
    return genTable(_row,_col,_mines)
}
