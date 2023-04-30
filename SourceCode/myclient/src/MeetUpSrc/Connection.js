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
import { Divider, List, Typography } from 'antd';
import { Input } from 'antd';
const { Search } = Input;

const Connection = () => {
    const [ID, setID] = useState(undefined);
    const [userList, setList] = useState(undefined)
    const [search, setSearch] = useState(undefined)
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getList = async () => {
            try {
                //let { data } = await axios.post("http://localhost:3000/getconnections/", { 'email': currentUser.email });
                let { data } = await axios.post("http://ec2-54-174-186-17.compute-1.amazonaws.com:3000/getconnections/", { 'email': currentUser.email });
                setList(data);
                console.log(data)
                if (data.length == 0) {
                    alert("No Connections yet");
                }
            } catch (e) {
                console.log(e);
            }
        }
        getList();

    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <a className="action-link"
                        onClick={() => connect(record)}
                        style={{
                            textDecoration: 'none',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '0.5rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Connect
                    </a>
                </Space>
            ),
        },

    ]

    const connect = async(record) => {
        for(let i = 0;i<userList.length;i++){
            console.log(userList[i])
            if(userList[i]==record.email){
                alert('This user is connected');
                return;
            }
        }
        if(record.email==currentUser.email){
            alert('You can not connect yourself')
            return;
        }
        try {
            //let { data } = await axios.post("http://localhost:3000/connect/", { 'email': currentUser.email, 'email2': record.email });
            let { data } = await axios.post("http://ec2-54-174-186-17.compute-1.amazonaws.com:3000/connect/", { 'email': currentUser.email, 'email2': record.email });
            alert("Connection with " + record.email + " has been created")
            console.log(data)
            window.location.reload();
        }
        catch (e) {
            console.log(e);
        }
    }
    const onSearch = async (val) => {
        try {
            //let { data } = await axios.post("http://localhost:3000/getUser/", { 'email': val });
            let { data } = await axios.post("http://ec2-54-174-186-17.compute-1.amazonaws.com:3000/getUser/", { 'email': val });
            setSearch(data);
            console.log(data)

        }
        catch (e) {
            console.log(e);
        }

    }
    const disconnect = async (record) => {
        //console.log(record)
        try {
            //let { data } = await axios.post("http://localhost:3000/disconnect/", { 'email': currentUser.email, 'email2': record });
            let { data } = await axios.post("http://ec2-54-174-186-17.compute-1.amazonaws.com:3000/disconnect/", { 'email': currentUser.email, 'email2': record });
            console.log(data)
            alert("Disconnected from " + record)
            window.location.reload();
        }
        catch (e) {
            console.log(e);
        }
    }
    return (

        <div className="mainDisplay"
        style={{
            height: "100%"
        }}
        >
            <MyNavbar />

            <List
                header={<h2 style={{ textAlign: "center" }}>My Connections</h2>}
                bordered
                dataSource={userList}
                renderItem={(item) =>
                    <List.Item
                        title={item.name}
                        actions={[
                            <a
                                key="list-loadmore-edit"
                                style={{
                                    border: "1px solid black",
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    borderRadius: '0.5rem',
                                }}
                                onClick={() => disconnect(item)}>
                                DISCONNECT
                            </a>
                        ]}
                    >{item}</List.Item>
                }
            />
            <Search
                placeholder="Search and connect"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />


            <Table
                columns={columns.map(column => ({
                    ...column,
                    title: <span style={{ fontSize: "1.2rem" }}>{column.title}</span>
                }))}
                dataSource={search}
                //onChange={onChange}
                rowClassName={(record, index) =>
                    index % 2 === 0 ? 'highlight-row-even' : 'highlight-row-odd'
                }
                style={{ padding: "4rem", border: "2px solid #ddd" }}
            />
        </div>
    );
};
export default Connection;