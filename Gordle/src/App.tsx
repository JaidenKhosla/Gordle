import { useEffect, useState } from 'react'
import "./stylesheets/App.css"
import Table from './Table';
import { WordManager, generateRandomWord } from './WordManager';
import SuccessReveal from './SuccessReveal';


function App() {

  const [useFoo, setFoo] = useState(false);
  const [manager,  setManager] = useState(new WordManager(generateRandomWord()));
  
  useEffect(()=>{
    alert(manager.WORD);
  },[])
  
  return (
    <div className='container'>
    <h2>Gordle</h2>
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