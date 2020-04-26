import React, {useContext} from "react";
import Link from "next/link"
import {Row, Col, Menu, Dropdown} from "antd"
import {SearchOutlined, MenuOutlined} from "@ant-design/icons"
import {FlagContext, SHOW_SIDEBAR} from "../store/SidebarFlag"
import {TOGGLE_SEARCH} from "../store/SearchFlag"

const menu = children => {
        return (
            <Menu>
                {
                    children.map((v, i) => {
                        return (
                            <Menu.Item key={i}>
                                <Link href={v.category_path}>
                                    <a>{v.category_name}</a>
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        )
    };

const Nav = props => {
    const {dispatch} = useContext(FlagContext)
    return (
        <Row align="center" justify="center" className="nav-bar">
            <Col span={12} className="logo">
                <Link href="/">
                    <img src="/images/logo.png" alt="季七呀！" className="logo-img"/>
                </Link>
            </Col>
            <Col span={12} className="right-head">
                <ul className="nav-list">
                    {
                        props.navItem.map((v, i) => {
                            if (v.path) {
                                return (
                                    <li className="nav-item" key={i}><Link href={v.path}><a>{v.title}</a></Link></li>
                                )
                            } else {
                                return (
                                    <Dropdown overlay={menu(v.children)} placement="bottomCenter" key={i}>
                                        <li className="nav-item">{v.title}</li>
                                    </Dropdown>
                                )
                            }

                        })
                    }
                </ul>
                <SearchOutlined
                    style={{fontSize: "1.5em", cursor: "pointer"}}
                    onClick={()=>{
                        props.searchDispatch({
                            type:TOGGLE_SEARCH
                        })
                    }}
                />
            </Col>
            <Col span={12} className="menu">
                <MenuOutlined
                    style={{fontSize: "1.5em", cursor: "pointer"}}
                    className="menu-icon"
                    onClick={() => {
                        dispatch({type: SHOW_SIDEBAR})
                    }}
                />
            </Col>
        </Row>
    )
}

export default Nav