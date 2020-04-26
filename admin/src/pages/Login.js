import React, {useState} from "react"
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import http from "../plugins/http";

import "../css/pages/login.scss"

const Login = props => {
    const [username,setUsername] = useState();

    const onFinish = values =>{
        http.post("/login",values).then(res =>{
            localStorage.token = res.data.token;
            message.success("login success!")
            props.history.push("/")
        })
    }

    const checkUsername = async ()=>{
        let res = await http.get(`/checkUsername/${username}`);
        if (res.status !== 404){
            if (!res.data.isUse){
                throw new Error('The user you entered does not exist!');
            }
        }
    }

    return (
        <>
            <div id="login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        validateTrigger={"onBlur"}
                        rules={[
                            { required: true, message: 'Please input your Username!' },
                            { validator:checkUsername}
                            ]}
                    >
                        <Input onChange={e => setUsername(e.target.value)}
                               prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item className="login-submit">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Login;