import React from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";
import ReactTextTransition, { presets } from "react-text-transition";

const TEXTS = ['CONGRATULATIONS TEAM QENA !  🎉', 'ON SUCCESSFULLY LAUNCHING ','MICHU PLATFORM 🎊'];

const colors = ["#ff9c37", "#47c8ff"];

export const TypeAnimation = () => {
  const [index, setIndex] = React.useState(0);
  const navigate = useNavigate()

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  React.useEffect(() => {
    const intervalId = setInterval(
      () => window.location.href = 'https://metabase.michu.com.et/public/dashboard/0630172e-6191-413f-b813-901b0c7c9eb3',
      13000 
    );
    
    return () => clearTimeout(intervalId);
   

  }, []);

  return (
 
    <section className="inline" id="animate">
       <ConfettiExplosion/>
    <ReactTextTransition
      springConfig={presets.gentle}
      className="big"
      delay={300}
      inline
      text={TEXTS[index % TEXTS.length]}
      style={{ color: colors[index % colors.length]}}

    >
    
    </ReactTextTransition>

  </section>
   
   
     

  );
};
