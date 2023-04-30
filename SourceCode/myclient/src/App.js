import "./App.css";

import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./MeetUpSrc/Firebase/Auth"
import Home from "./MeetUpSrc/Home";
/* import Response from "./MeetUpSrc/Response"; */
import ResponseNew from "./MeetUpSrc/ResponseNew";
import Invite from "./MeetUpSrc/Invite";
import CreatePoll from "./MeetUpSrc/CreatePoll"
import PollBarChart from "./MeetUpSrc/PollBarChart";
import Login from './MeetUpSrc/Login';
import SignUp from "./MeetUpSrc/Signup";
import Dashboard from "./MeetUpSrc/Dashboard";
import Connection from "./MeetUpSrc/Connection";
function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/CreatePoll' element={<CreatePoll />} />
                    <Route path='/Response' element={<ResponseNew />} />
                    <Route path='/Invite' element={<Invite />} />
                    <Route path='/ViewPoll' element={<PollBarChart />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path='/Connection' element={<Connection/>} />
                </Routes>
            </HashRouter>
        </AuthProvider>
    )
}

export default App;