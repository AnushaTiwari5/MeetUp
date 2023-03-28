import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthProvider} from "./MeetUpSrc/Firebase/Auth"
import Home from "./MeetUpSrc/Home";
import Response from "./MeetUpSrc/Response";
import EventResponse from "./MeetUpSrc/EventRepsonse";
import Invite from "./MeetUpSrc/Invite";
import CreatePoll from "./MeetUpSrc/CreatePoll"
import PollBarChart from "./MeetUpSrc/PollBarChart";
import Login from './MeetUpSrc/Login';
import SignUp from "./MeetUpSrc/Signup";

function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/CreatePoll' element={<CreatePoll />} />
                <Route path='/EventResponse' element={<EventResponse />} />
                <Route path='/Response' element={<Response />} />
                <Route path='/Invite' element={<Invite />} />
                <Route path='/ViewPoll' element={<PollBarChart />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/SignUp' element={<SignUp />} />
            </Routes>
        </Router>
        </AuthProvider>
    )
}

export default App;