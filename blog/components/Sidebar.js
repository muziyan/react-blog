import React, {useContext, useState} from "react";
import Link from "next/link"
import "../static/style/components/sidebar.css"
import {Row,Col} from "antd"
import {CloseOutlined, SearchOutlined} from "@ant-design/icons"
import {FlagContext,HIDE_SIDEBAR} from "../store/SidebarFlag"
import Router from "next/router";

const Sidebar = props =>{
    const {flag,dispatch} = useContext(FlagContext)
    const [searchText,setSearchText] = useState("")
    return (
        <>
            <Row className={flag === 1 ? "sidebar" : (flag === true ? "sidebar sidebar-show" : "sidebar sidebar-hide")}>
                <Col span={14} md={10}  className="sidebar-main">
                    <div className="avatar">
                        <img className="avatar-img" src="https://api.vvhan.com/api/qt?qq=997432833" alt="avatar"/>
                    </div>
                    <div className="search-box">
                        <input
                            type="search"
                            value={searchText}
                            onChange={e=>setSearchText(e.target.value)}
                            placeholder="请输入文章关键字..."/>
                        <button
                            type="submit"
                            onClick={()=>{
                                Router.push(`/search/${searchText}`)
                            }}
                        >
                            <SearchOutlined/>
                        </button>
                    </div>
                    <nav className="sidebar-nav">
                        {
                            props.navItem.map((v,i)=>{
                                if (v.path){
                                    return (
                                        <div className="sidebar-nav-item" key={i}>
                                            <Link href={v.path}>
                                                <a>{v.title}</a>
                                            </Link>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div className="sidebar-nav-item" key={i}>
                                            {v.title}
                                            {
                                                v.children.map((val,inx) =>{
                                                    return (
                                                        <div className="sidebar-nav-item-children" key={inx}>
                                                            <Link href={val.category_path}><a>{val.category_name}</a></Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            })
                        }
                    </nav>
                </Col>
                <Col span={10} md={14} className="sidebar-mask">
                    <CloseOutlined
                        className="close"
                        onClick={()=>{
                            dispatch({type:HIDE_SIDEBAR})
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Sidebar