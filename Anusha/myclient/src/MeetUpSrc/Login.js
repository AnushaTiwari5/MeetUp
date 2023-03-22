import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
// Home/Log in page
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import MyNavbar from "./Navbar";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxOZMMCtyuLJeTPiTvzO-f48M2eUWAhjM",
  authDomain: "icsi518projectm.firebaseapp.com",
  projectId: "icsi518projectm",
  storageBucket: "icsi518projectm.appspot.com",
  messagingSenderId: "717353397564",
  appId: "1:717353397564:web:7115df436c70a791424239",
  measurementId: "G-6Q9WBXR07W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const signIn = (event, e, p) => {
  signInWithEmailAndPassword(auth, e, p)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid)
      // ...
    })
}


const Login = () => {
  const auth = getAuth();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="mainDisplay">

      <MyNavbar />

      <div 
      style={{
        textAlign: "center"
      }}>
        <h3>Welcome Back!</h3>
        <h4>Enter your credentials to continue</h4>

        <Space direction="vertical"
          style={{
            margin: "5%",
            border: "5px solid rgb(125, 112, 156)",
            borderRadius: "30px",
            padding: "3%",
            
          }}>

          <Input
            placeholder="Enter your email address"
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            onChange={(event) => setemail(event.target.value)}
          />
          <Space direction="horizontal">
            <Input.Password
              placeholder="Enter password"
              visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              onChange={(event) => setpassword(event.target.value)}
            />
            <Button style={{ width: 80 }} onClick={() => setPasswordVisible((prevState) => !prevState)}>
              {passwordVisible ? 'Hide' : 'Show'}
            </Button>
          </Space>

          <a href="/">
          <Button style={{ width: 80 }} onClick={() => signIn(auth, email, password)}>
            {"Sign in"}
          </Button>
          </a>
          
        </Space>

        <p>
          Don't have an account? 
          <br />
          <a href="/SignUp">
            {"Create an account " + String.fromCharCode(8594)}
          </a>
        </p>
      </div>

    </div>
  );

};
export default Login;