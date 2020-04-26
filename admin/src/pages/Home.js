import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Select, Upload} from "antd";
import MdEditor from "react-markdown-editor-lite";
import {Link} from "react-router-dom";
import MarkdownIt from "markdown-it";
import http from "../plugins/http";

import 'react-markdown-editor-lite/lib/index.css';
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 22 },
};

const tailLayout = {
    wrapperCol: {
        offset: 2,
        span: 16,
    }
};

const Home =()=>{
    const [title,setTitle] = useState("");
    const [categoryId,setCategoryId] = useState()
    const [cover,setCover] = useState("");
    const [description,setDescription] = useState("")
    const [context,setContext] = useState("")
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [form] = Form.useForm();

    // 初始化Markdown解析器
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const onFinish = values =>{
        values = Object.assign(values,{cover})
        http.post("/article",values).then(res =>{
            initForm()
            message.success('create user success!');
        })
    }

    const initForm = ()=>{
        form.setFieldsValue({
            title:"",
            category_id:"",
        })
        setCover("")
        setContext("")
        setDescription("")
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const onChangeFile =  info =>{
        if (info.file.status === 'uploading'){
            setLoading(true)
        }
        if (info.file.status === 'done') {
            setLoading(false)
            setCover(info.file.response.fileUrl)
        }
    }

    useEffect(()=>{
        http.get("/category").then(res =>{
            setCategories(res.data.data)
        })
    },[])

    return (
        <>
            <Form
                {...layout}
                form={form}
                name="article-edit"
                onFinish={onFinish}
            >
                <Form.Item
                    label="文章标题"
                    name="title"
                    rules={[{required:true,message:"Please input article title!"}]}
                >
                    <Input onChange={e => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="文章栏目"
                    name="category_id"
                    rules={[{required:true,message:"Please input article category!"}]}
                >
                    <Select onChange={e => setCategoryId(e)}>
                        {
                            categories.map(v=>{
                                return (
                                    <Select.Option key={v.id} value={v.id}>{v.category_name}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="文章封面"
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={onChangeFile}
                        action="http://localhost:7001/api/upload"
                    >
                        {cover ? <img src={cover} alt="avatar" style={{ width: '300px' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="文章描述"
                    name="description"
                >
                    <div className="article-mark" style={{height:"200px"}}>
                        <MdEditor
                            value={description}
                            renderHTML={(text) => {
                                setDescription(text)
                                return mdParser.render(text)
                            }}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    label="文章内容"
                    name="context"
                >
                    <div className="article-mark" style={{height:"100vh"}}>
                        <MdEditor
                            value={context}
                            renderHTML={(text) => {
                                setContext(text)
                                return mdParser.render(text)
                            }}
                        />
                    </div>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                    <Button type="default" style={{marginLeft:"10px"}}><Link to="/article-list">返回</Link></Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Home