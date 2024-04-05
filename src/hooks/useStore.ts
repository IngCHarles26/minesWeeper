import { create } from "zustand";
import { minesWeeper } from "../assets/tableGenerator";

type State = {
  difficulty: string,
  customValues:{rows:number,columns:number,mines:number},
  page: number,
  time: string,
  flags: [number,number][],
  message: string,
  table: number[][],
  mines: [number,number][],
  visibility: boolean[][],
  win: boolean,
  lose: boolean,
}

type Action ={
  setDifficulty: (type:string) => void,
  setCustomValues: (type:string,value:number) => void,
  setPage: (type:number)=> void,
  setTime: (type:string)=>void,
  setFlags: (type:State['flags'])=>void,
  setMessage: (type:string)=>void,
  setTable: (type:State['table'])=>void,
  setMines: (type:State['mines'])=>void,
  setVisibility: (type:State['visibility'])=>void,
  setWin: (type:boolean)=>void,
  setLose: (type:boolean)=>void,
}

const useStore = create<State & Action>((set)=>({
  //__________page list
  page: 0,
  setPage:(_page)=>set(()=>({page:_page})),

  //__________difficulty
  difficulty: '',
  setDifficulty: (type)=>set(()=>({difficulty:type})),
  
  //__________custom values
  customValues: { rows:0, columns:0, mines:0 },
  setCustomValues: (type:string,value:number)=>set(({customValues})=>({customValues:{...customValues,[type]:value}})),
  
  //__________table
  table: [],
  setTable: (_table)=>set(()=>({table: _table})),

  //__________mines
  mines: [],
  setMines: (_mines)=>set(()=>({mines: _mines})),

  //__________visibility
  visibility: [],
  setVisibility: (_visibility)=>set(()=>({visibility: _visibility})),

  //__________time
  time:'',
  setTime: (_time)=>set(()=>({time:_time})),
  
  //__________flags position
  flags: [],
  setFlags: (_flags)=>set(()=>({flags:_flags})),
  
  //__________flags position
  message: '',
  setMessage: (_message)=>set(()=>({message:_message})),
  
  //__________win
  win: false,
  setWin: (_win)=>set(()=>({win:_win})),
  
  //__________win
  lose: false,
  setLose: (_lose)=>set(()=>({lose:_lose})),


}))


export default useStore;