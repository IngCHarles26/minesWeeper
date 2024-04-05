import { useState } from 'react';
import { images } from '../../assets/images';
import useStore from '../../hooks/useStore';
import './landing.css';
import { minesWeeper } from '../../assets/tableGenerator';

const levels:('easy'|'medium'|'hard')[] =['easy','medium','hard'];

const inputs = [
  {placeholder: 'ROWS'},
  {placeholder: 'COLUMNS'},
  {placeholder: 'MINES'},
];



export function Landing() {
  const [showWarning, setShowWarning] = useState(false);
  const {setDifficulty,setCustomValues,customValues,setPage,setTable,setMines,setVisibility} = useStore(st=>st);


  const handleDifficulty = (nameDiff:'easy'|'medium'|'hard')=>{
    setDifficulty(nameDiff);
    const board = minesWeeper(nameDiff,0,0,0);
    console.log(board)
    setTable(board.table);
    setMines(board.minesPos);
    setVisibility(board.visibility);
    setPage(1);
  };

  const handleCustomDifficulty = ()=>{
    const validate = Object.values(customValues).every(el=>0<el);
    if(!validate) return setShowWarning(true)

    setDifficulty('custom');
    const {rows,columns,mines} = customValues;
    const board = minesWeeper('custom',rows,columns,mines);
    setTable(board.table);
    setMines(board.minesPos);
    setVisibility(board.visibility);
    setPage(1);

  };

  const handleCustomValues = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name.toLowerCase();
    const value = +e.target.value;
    setCustomValues(name,value)
    if(Object.values(customValues).every(el=>0<el)) setShowWarning(false)
  }

  return (
    <div className='Landing'>

      <div className='title-landing'>
        <h1>MINESWEEPER</h1>
        <img className='imageHero' src={images.hero} alt="hero_images" />
      </div>

      <div className='select-level'>
        {
          levels.map( (level,ix)=>(
            <button 
                key={'level-button'+ix}
                className='levelButton'
                onClick={()=>handleDifficulty(level)}
              >
                {level}
            </button>
          ))
        }
      </div>

      <fieldset className='custom-level'>
        <button 
          className='levelButton'
          onClick={()=>handleCustomDifficulty()}
        > CUSTOM </button>
        <div>
          {
            inputs.map( ({placeholder},ix) => (
              <input 
                key={'button-option-'+ix} 
                placeholder={placeholder} 
                type='number'
                name={placeholder}
                onChange={(e)=>handleCustomValues(e)}
              />
            ))
          }
        </div>
        {
          showWarning && <p>Missing Values</p>
        }
      </fieldset>

      <div className='footer-landing'>
        <p>CarlosCo_Dev</p>
        <p>Special thanks to: Curt Johnson and Robert Donner</p>
      </div>

    </div>
  );
}