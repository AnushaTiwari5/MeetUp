import React,{useEffect,useState} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import img from './image/image.png'
import img2 from './image/FISH.jpg'
// Home/Log in page
const Login  = ()=>{

    const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Space direction="vertical">
      <Input.Password placeholder="input password" />
      <Input.Password
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
    </Space>
  );
 
} ;
export default App;