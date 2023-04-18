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


export default function Dashboard() {

    const { currentUser } = useContext(AuthContext);
    const [events, setEvents] = useState(undefined);
    const userCredential = firebase.auth().currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const getEvents = async () => {
            try {
                let { data } = await axios.post("http://localhost:3000/Events");
                setEvents(data);
                console.log(data)
                if (data.length == 0) {
                    alert("No incoming events");
                }
            } catch (e) {
                console.log(e);
            }
        }
        getEvents();

    }, []);

    const click =()=>{

    }

    const click2 =()=>{
        navigate('/Invite')
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: 'title',
            dataIndex: 'title'
        },
        {
            title: 'description',
            dataIndex: 'description'
        },
        {
            title:  'Time',
            dataIndex: 'final_time'
        },
        
        {
            title: 'Location',
            dataIndex: 'final_location'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <a className="action-link" onClick={()=>click(record)}>See details</a>
                <a className="action-link" onClick={()=>click2(record)}>Invite</a>
              </Space>
            ),
          },

    ]
    //const data

    return (
        <div className="mainDisplay">
             <MyNavbar /><div>
            
            <h2 style={{textAlign: "center"}}>Your Events</h2>
            <br />

            <Table columns={columns} dataSource={events} onChange={onChange} />

        </div></div>
    
    )
}