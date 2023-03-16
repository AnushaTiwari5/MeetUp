import React,{useEffect,useState} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [repassword,setrepassword] = useState("");

const create_account = (auth, email, password,rep)=>{

    if(password != rep){

    }


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed in
            const user = userCredential.user;
    // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    // ..
  });
}

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (
      <Space direction="vertical">
        <Input
      placeholder="Enter your email address"
      prefix={<UserOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="Enter your email address">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
      onChange={(event) => setemail(event.target.value)}
    />
        <Space direction="horizontal">
          <Input.Password
            placeholder="input password"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
          <Button style={{ width: 80 }} onClick={() => setPasswordVisible((prevState) => !prevState)}>
            {passwordVisible ? 'Hide' : 'Show'}
          </Button>
        </Space>
        <Space direction="horizontal">
          <Input.Password
            placeholder="check password"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
          <Button style={{ width: 80 }} onClick={() => setPasswordVisible((prevState) => !prevState)}>
            {passwordVisible ? 'Hide' : 'Show'}
          </Button>
        </Space>
        <Button style={{ width: 80 }} onClick={() =>create_account(auth, email, password,repassword)}>
          {"Sign in"}
        </Button>
      </Space>
    );
  };
  
  export default SignUp;