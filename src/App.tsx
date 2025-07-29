import { useState } from 'react'
import "./stylesheets/App.css"
import Table from './Table';
import { WordManager } from './WordManager';
import SuccessReveal from './SuccessReveal';
import Image from "./assets/wordleLogo.svg";


function App() {

  const [useFoo, setFoo] = useState(false);
  const [manager,  setManager] = useState(new WordManager());

  function reload(): void{
    window.location.reload();
  }

  return (
    <div className='container'>
    <div className='header' onClick={reload}><h2>Gordle</h2><img typeof='images/svg+xml' src={Image}/></div>
    <SuccessReveal manager={manager} foo={useFoo}/>
    <Table manager={manager} rerouteFunction={()=>{
      setManager(manager.reroute());
      if(manager.COMPLETED) setFoo(true);
      return manager;
    }}></Table>
    </div>
  );
}

export default App