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
import { useNavigate, Link } from "react-router-dom";
import { Descriptions } from 'antd';
import './Dashboard.css';


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
            title: 'Title',
            dataIndex: 'title'
        },
       ,
        {
            title:  'Start Time',
            dataIndex: 'start_time'
        },
        {
            title:  'End Time',
            dataIndex: 'end_time'
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <a className="action-link" onClick={()=>click(record)} style={{ textDecoration: 'none', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', borderRadius: '0.5rem', fontWeight: 'bold' }}>See details</a>
                <a className="action-link" onClick={()=>click2(record)} style={{ textDecoration: 'none', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', borderRadius: '0.5rem', fontWeight: 'bold' }}>Invite</a>
                <Link to={`http://localhost:3000/ViewPollStats/${record.event_id}`} style={{ textDecoration: 'none', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', borderRadius: '0.5rem', fontWeight: 'bold' }}>See Poll Statistics</Link>
              </Space>
            ),
          },

    ]

    return (
        
        <div className="mainDisplay">
            
             <MyNavbar /><div>
            
            <h2 style={{textAlign: "center"}}>Your Events</h2>
            <br />

            <Table
            columns={columns.map(column => ({
                ...column,
                title: <span style={{ fontSize: "1.2rem" }}>{column.title}</span>
            }))}
            dataSource={events}
            onChange={onChange}
            rowClassName={(record, index) =>
                index % 2 === 0 ? 'highlight-row-even' : 'highlight-row-odd'
            }
            style={{ padding: "4rem", border: "2px solid #ddd" }}
            />


        </div>
        <p>
        <div >
            <Descriptions
              title="Event Descriptions"
              bordered
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Title">{detail.title}</Descriptions.Item>
              <Descriptions.Item label="Orgnizer">{detail.orgnizer}</Descriptions.Item>
              <Descriptions.Item label="start time">{detail.start_time}</Descriptions.Item>
              <Descriptions.Item label="end time">{detail.end_time}</Descriptions.Item>
              <Descriptions.Item label="Location">{detail.location}</Descriptions.Item>
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