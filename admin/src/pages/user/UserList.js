import React, {useEffect, useState} from "react";
import {message, Table} from 'antd';
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import http from "../../plugins/http";

const UserList = ()=>{
    const col = [
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                <a style={{marginRight:5}} href={`/user-edit/${record.id}`}><EditOutlined/></a>
                <span onClick={()=>{destroy(record.id)}} style={{cursor:"pointer"}}><DeleteOutlined/></span>
            </span>
            )
        }
    ]

    let destroy = id =>{
        http.delete(`/user/${id}`).then(res=>{
            if (res.status === 204){
                getUsers()
                message.success('remove user success!');
            }
        })
    }

    const [columns,setColumns] = useState([])
    const [users,setUsers] = useState([])

    const getUsers = ()=>{
        http.get("/user").then(res=>{
            setUsers(res.data.data)
        })
    }

    useEffect(()=>{
        http.get("/user").then(res =>{
            setColumns([
                ...res.data.columns,
                ...col
            ])
            setUsers(res.data.data)
        });
    },[])
    return (
        <>
            <Table columns={columns} dataSource={users} />
        </>
    )
}

export default UserList;