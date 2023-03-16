import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CreatePoll from './CreatePoll'
import PollBarChart from './PollBarChart'
import Login from './Login'
import SignUp from './SignUp'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/CreatePoll' element={<CreatePoll />}>
        </Route>
        <Route path='/chart' element={<PollBarChart />}>
        </Route>
        <Route path='/Login' element={<Login />}>
        </Route>
        <Route path='/SignUp' element={<SignUp />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
