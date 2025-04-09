import { useEffect, useState } from 'react'
import "./stylesheets/App.css"
import Table from './Table';
import { WordManager, generateRandomWord } from './WordManager';
import SuccessReveal from './SuccessReveal';

let manager = new WordManager(generateRandomWord());
manager = manager.reroute();


function App() {

  

  return (
    <div className='container'>
    <h2>Gordle</h2>
    <SuccessReveal manager={manager}/>
    <Table manager={manager} rerouteFunction={()=>{
      manager = manager.reroute();
      return manager;
    }}></Table>
    </div>
  );
}

export default App