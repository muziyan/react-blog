import React, {useEffect, useState} from "react"
import {message, Table} from 'antd';
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import http from "../../plugins/http";

const CategoryList = () => {
    const [columns,setColumns] = useState([])
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        http.get("/category").then(res =>{
            setColumns([
                ...res.data.columns,
                ...col
            ])
            setCategories(res.data.data)
        });
    },[])

    const col = [
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                <a style={{marginRight:5}} href={`/category-edit/${record.id}`}><EditOutlined/></a>
                <span onClick={()=>{destroy(record.id)}} style={{cursor:"pointer"}}><DeleteOutlined/></span>
            </span>
            )
        }
    ]

    const destroy = id =>{
        http.delete(`/category/${id}`).then(()=>{
            getNavs()
            message.success('remove category success!');
        })
    }

    const getNavs = ()=>{
        http.get("/category").then(res=>{
            setCategories(res.data.data)
        })
    }

    return (
        <>
            <Table columns={columns} dataSource={categories} />
        </>
    );
}

export default CategoryList;