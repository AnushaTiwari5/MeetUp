import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import firebase from 'firebase/compat/app';
import firebaseApp from "./Firebase/firebase";
import { doSignInWithEmailAndPassword } from "./Firebase/firebaseops";
import { AuthContext } from './Firebase/Auth'
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = firebase.getAnalytics(firebaseApp);
//const auth = firebase.getAuth();




const Login = () => {
  // const auth = firebase.getAuth();
  const { currentUser } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const SignIn = async (e, p) => {
    //event.preventDefault();
    //let {email,password} = event.target.elements
    console.log(e);
    try {
      await doSignInWithEmailAndPassword(e, p)
      //alert("user id ",user.uid)
    } catch (err) {
      alert(err)
    }
    if (currentUser) {
      const userCredential = firebase.auth().currentUser;
      console.log(userCredential.uid);
    }
  }

  return (
    <Space direction="vertical">
      <Input
        placeholder="Enter your email address"
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
          placeholder="input password"
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

  );

};
export default Login;