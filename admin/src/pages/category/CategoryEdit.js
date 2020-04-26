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

const CategoryEdit = props => {
    const [categoryId,setCategoryId] = useState(0)
    const [categoryName,setCategoryName] = useState("");
    const [categoryPath,setCategoryPath] = useState("")
    const [form] = Form.useForm();

    const onFinish = values => {
        let method = categoryId === 0 ? "post" : "put";
        let url = categoryId === 0 ? "/category" : `/category/${categoryId}`
        http[method](url,values).then(res =>{
            if (categoryId === 0){
                message.success('create user success!');
            }else{
                message.success('update user success!');
            }
            props.history.push("/category-list")
        })
    };

    const initForm = ()=>{
        form.setFieldsValue({
            category_name:categoryName,
            category_path:categoryPath
        })
    }

    let getCategory = (id)=>{
        http.get(`/category/${id}`).then(res =>{
            let {data} = res;
            form.setFieldsValue({
                category_name:data.category_name,
                category_path:data.category_path
            })
        })
    }


    useEffect(()=>{
        initForm()
        let temId = props.match.params.id;
        if (temId){
            setCategoryId(temId)
            getCategory(temId)
        }
        return ()=>{
            setCategoryId(0)
            temId = 0;
        }
    }, [])

    return (
        <>
            <Form
                {...layout}
                name="basic"
                form={form}
                initialValues={{ category_name:categoryName,category_path:categoryPath }}
                onFinish={onFinish}
                scrollToFirstError={true}
            >
                <Form.Item
                    label="栏目名称"
                    name="category_name"
                    validateTrigger={"onBlur"}
                    rules={[
                        {
                            required:true,
                            message: "please input your category name!"
                        }
                    ]}
                >
                    <Input onChange={e => setCategoryName(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="栏目路径"
                    name="category_path"
                    rules={[{ required: true, message: 'Please input your category path!' }]}
                >
                    <Input onChange={e => setCategoryPath(e.target.value)}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                    <Button type="default" style={{marginLeft:"10px"}}><Link to="/category-list">返回</Link></Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CategoryEdit;