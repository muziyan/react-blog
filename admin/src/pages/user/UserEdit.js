import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { Form, Input, Button, Select,message } from 'antd';
import http from "../../plugins/http";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    }
};

const UserEdit = props =>{

    const initForm = ()=>{
        form.setFieldsValue({
            username,
            password,
            type
        })
    }

    let getUser = (id)=>{
        http.get(`/user/${id}`).then(res =>{
            let user = res.data.data;
            form.setFieldsValue({
                username:user.username,
                password:user.password,
                type:String(user.type)
            })
        })
    }

    useEffect(()=>{
        initForm()
        let temId = props.match.params.id;
        if (temId){
            setUserId(temId)
            getUser(temId)
        }
        return ()=>{
            setUserId(0)
            temId = 0;
        }
    }, [])

    const [userId,setUserId] = useState(0)
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("")
    const [type,setType] = useState("2")
    const [form] = Form.useForm();

    const onFinish = values => {
        let method = userId === 0 ? "post" : "put";
        let url = userId === 0 ? "/user" : `/user/${userId}`
        http[method](url,values).then(res =>{
            if (userId === 0){
                message.success('create user success!');
            }else{
                message.success('update user success!');
            }
            props.history.push("/user-list")
        })
    };

    const checkUsername = async ()=>{
        let res = await http.get(`/checkUsername/${username}`);
        if (res.status !== 404){
            if (res.data.isUse){
                throw new Error('username has been used!');
            }
        }
    }

    return (
        <>
            <Form
                {...layout}
                name="basic"
                form={form}
                initialValues={{ username,password,type }}
                onFinish={onFinish}
                scrollToFirstError={true}
            >
                <Form.Item
                    label="用户名称"
                    name="username"
                    validateTrigger={"onBlur"}
                    rules={[
                        {
                            required:true,
                            message: "please input your username!"
                        },
                        {
                            validator:checkUsername
                        }
                    ]}
                >
                    <Input onChange={e => setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="用户密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password  onChange={e => setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="用户身份"
                    name="type"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Select onChange={e => setType(e)}>
                        <Select.Option value="0">超级管理员</Select.Option>
                        <Select.Option value="1">高级管理员</Select.Option>
                        <Select.Option value="2">普通管理员</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                    <Button type="default" style={{marginLeft:"10px"}}><Link to="/user-list">返回</Link></Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default UserEdit;