import React, { useEffect, useState, useContext } from "react";
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
import firebase from 'firebase/compat/app';
import firebaseApp from "./Firebase/firebase";
import { doSignInWithEmailAndPassword } from "./Firebase/firebaseops";
import { AuthContext } from './Firebase/Auth'
import { useNavigate } from "react-router-dom";
import MyNavbar from "./Navbar";
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();




const Login = () => {
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const SignIn = async (e, p) => {
    //event.preventDefault();
    //let {email,password} = event.target.elements
  
    console.log(e);

    try {
      console.log(e, p);
      await doSignInWithEmailAndPassword(e, p)
      navigate('/CreatePoll')
      //alert("user id ",user.uid)
    } catch (err) {
      alert("Your email or password is incorrect")
    }

    if (currentUser) {
      const userCredential = firebase.auth().currentUser;
      console.log(userCredential.uid);
      
    }
  }

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

            <Button style={{ width: 80 }} onClick={() => SignIn(email, password)}>
              {"Sign in"}
            </Button>
          

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