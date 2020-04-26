import React, {useEffect, useState} from "react"
import {message, Table} from 'antd';
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import http from "../../plugins/http";


const NavList = () => {
    const [columns,setColumns] = useState([])
    const [navs,setNavs] = useState([])

    useEffect(()=>{
        http.get("/nav").then(res =>{
            setColumns([
                ...res.data.columns,
                ...col
            ])
            setNavs(res.data.data)
        });
    },[])

    const col = [
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                <a style={{marginRight:5}} href={`/nav-edit/${record.id}`}><EditOutlined/></a>
                <span onClick={()=>{destroy(record.id)}} style={{cursor:"pointer"}}><DeleteOutlined/></span>
            </span>
            )
        }
    ]

    const destroy = id =>{
        http.delete(`/nav/${id}`).then(()=>{
            getNavs()
            message.success('remove nav success!');
        })
    }

    const getNavs = ()=>{
        http.get("/nav").then(res=>{
            setNavs(res.data.data)
        })
    }

    return (
        <>
            <Table columns={columns} dataSource={navs} />
        </>
    );
}

export default NavList;