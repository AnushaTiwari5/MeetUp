import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CreatePoll from './CreatePoll'
import PollBarChart from  './PollBarChart'
import React from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
function App() {
  return (
    <Router>
    <Routes>
      
      <Route path='/CreatePoll' element = {<CreatePoll/>}>
      </Route>
      <Route path='/chart' element = {<PollBarChart/>}>
      </Route>
    </Routes>
    </Router>
  );
}

export default App;
