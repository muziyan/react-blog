import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {Form, Input, Button, message} from 'antd';
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

const NavEdit = props => {
    const [navId,setNavId] = useState(0)
    const [title,setTitle] = useState("");
    const [path,setPath] = useState("")
    const [form] = Form.useForm();

    const onFinish = values => {
        let method = navId === 0 ? "post" : "put";
        let url = navId === 0 ? "/nav" : `/nav/${navId}`
        http[method](url,values).then(res =>{
            if (navId === 0){
                message.success('create user success!');
            }else{
                message.success('update user success!');
            }
            props.history.push("/nav-list")
        })
    };

    const initForm = ()=>{
        form.setFieldsValue({
            title,
            path
        })
    }

    let getNav = (id)=>{
        http.get(`/nav/${id}`).then(res =>{
            let {data} = res;
            form.setFieldsValue({
                title:data.title,
                path:data.path
            })
        })
    }


    useEffect(()=>{
        initForm()
        let temId = props.match.params.id;
        if (temId){
            setNavId(temId)
            getNav(temId)
        }
        return ()=>{
            setNavId(0)
            temId = 0;
        }
    }, [])

    return (
        <>
            <Form
                {...layout}
                name="basic"
                form={form}
                initialValues={{ title,path }}
                onFinish={onFinish}
                scrollToFirstError={true}
            >
                <Form.Item
                    label="导航名称"
                    name="title"
                    validateTrigger={"onBlur"}
                    rules={[
                        {
                            required:true,
                            message: "please input your nav name!"
                        }
                    ]}
                >
                    <Input onChange={e => setTitle(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="导航路径"
                    name="path"
                    rules={[{ required: true, message: 'Please input your nav path!' }]}
                >
                    <Input onChange={e => setPath(e.target.value)}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                    <Button type="default" style={{marginLeft:"10px"}}><Link to="/nav-list">返回</Link></Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default NavEdit;