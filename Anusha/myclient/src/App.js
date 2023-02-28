import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from "./MeetUpSrc/Home";
import Response from "./MeetUpSrc/Response";
import Invite from "./MeetUpSrc/Invite";
import CreatePoll from "./MeetUpSrc/CreatePoll"
import PollBarChart from "./MeetUpSrc/PollBarChart";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/CreatePoll' element={<CreatePoll />} />
                <Route path='/Response' element={<Response />} />
                <Route path='/Invite' element={<Invite />} />
                <Route path='/ViewPoll' element={<PollBarChart />} />
            </Routes>
        </Router>
    )
}

export default App;