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
import { Descriptions } from 'antd';

export default function Dashboard() {
    const [eventID, setEventID] = useState(0);
    const { currentUser } = useContext(AuthContext);
    const [events, setEvents] = useState(undefined);
    const userCredential = firebase.auth().currentUser;
    const [detail,setDetails] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:3000/getInvite`)
            .then((res) => res.json())
            .then((res) => {
                setEventID(res);
            })
    }, [])

    useEffect(() => {
        const getEvents = async () => {
            try {
                let { data } = await axios.post("http://localhost:3000/Events",{'email':currentUser.email});
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

    const click =(record)=>{
        
        setDetails(record);
    }

    const click2 =(record)=>{
        console.log(record);
        alert(`Your invitation code is: http://localhost:3000/Response/`+record.event_id)
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: 'title',
            dataIndex: 'title'
        },
       ,
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

        </div>
        <p>
        <div>
            <Descriptions
              title="Event Descriptions"
              bordered
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Title">{detail.title}</Descriptions.Item>
              <Descriptions.Item label="Orgnizer">{detail.orgnizer}</Descriptions.Item>
              <Descriptions.Item label="time">{detail.final_time}</Descriptions.Item>
              <Descriptions.Item label="Location">{detail.final_location}</Descriptions.Item>
              <Descriptions.Item label="Event-ID">{detail.event_id}</Descriptions.Item>
              <Descriptions.Item label="Description">
              {detail.description}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </p>
        </div>
    
    )
}