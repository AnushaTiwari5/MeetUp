import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { AuthContext } from "./Firebase/Auth";
import firebase from 'firebase/compat/app';
import { Space, Table, Tag } from 'antd';
import { useContext } from "react";
import MyNavbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Connection = () =>{
    const [ID, setID] = useState(undefined);
    const [userList,setList]=usestate(undefined)
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const getList = async () => {
            try {
                let { data } = await axios.post("http://localhost:3000/getconnections/"+currentUser.uid);
                setList(data);
                console.log(data)
                if (data.length == 0) {
                    alert("No Connections yet");
                }
            } catch (e) {
                console.log(e);
            }
        }
        getEvents();

    }, []);

    const addConnection=()=>{

    }
   
    
}
export default Connection;