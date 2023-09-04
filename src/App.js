
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomepageLayout from './core/home/home_index';
import { ReportIndex } from './core/Report/report_index';
import { ConfettiIndex } from './core/conffetty/Confetti';
import Rocket from './core/launch/launch_index';
import LottieControl from './core/launch/launch_index';


function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomepageLayout />}/>
      <Route path="/confetti" element={<ConfettiIndex />} />
      <Route path="/report" element={<ReportIndex />} />
  
    </Routes>
  </BrowserRouter>
  </div>
  );

}

export default App;
