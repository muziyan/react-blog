import React, {useEffect, useState} from "react"
import {message, Table} from 'antd';
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import http from "../../plugins/http";


const ArticleList = () => {
    const [columns,setColumns] = useState([])
    const [articles,setArticles] = useState([])

    useEffect(()=>{
        http.get("/article").then(res =>{
            setColumns([
                ...res.data.columns,
                ...col
            ])
            setArticles(res.data.data)
        });
    },[])

    const col = [
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                <a style={{marginRight:5}} href={`/article-edit/${record.article_id}`}><EditOutlined/></a>
                <span onClick={()=>{destroy(record.id)}} style={{cursor:"pointer"}}><DeleteOutlined/></span>
            </span>
            )
        }
    ]

    const destroy = id =>{
        http.delete(`/article/${id}`).then(()=>{
            getNavs()
            message.success('remove article success!');
        })
       }

    const getNavs = ()=>{
        http.get("/article").then(res=>{
            setArticles(res.data.data)
        })
    }

    return (
        <>
            <Table columns={columns} dataSource={articles} />
        </>
    );
}

export default ArticleList;