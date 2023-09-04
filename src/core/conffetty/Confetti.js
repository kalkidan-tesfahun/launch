import React from "react";
import Confetti from 'react-confetti';
import { Link } from "react-router-dom";
import useWindowSize from 'react-use/lib/useWindowSize';
import  {TypeAnimation}  from "./TypeAnimation";

export const ConfettiIndex = ()=>{
  const { width, height } = useWindowSize()
    return(
      <div id="App" style={{marginTop:"14%"}}>
      <div>
        <TypeAnimation id="typeanimation" />
      </div>
    
      <Confetti />
    </div>
    )
}