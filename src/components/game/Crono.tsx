import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";

function Crono() {
  // const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const {setTime,win,lose,count} = useStore(st=>st)

  
  const handleTime = (time:number) => time<10 ? `0${time}` : `${time}`;

  // useEffect(()=>{
  //   const intervalId = setInterval(()=>{setCount(s=>s+1)},1000);
  //   return ()=>clearInterval(intervalId)
  // },[])

  useEffect(()=>{
    if(!(win || lose)){
      setSeconds(count % 60);
      setMinutes((count-count % 60) / 60);
      setTime(handleTime(minutes) + ':' + handleTime(seconds))
    }
  },[count])

  const text = handleTime(minutes) + ':' + handleTime(seconds);

  return (
    <p className="crono">
      {text}
    </p>
  );
}

export default Crono;