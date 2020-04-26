import React, {useReducer} from "react";
import {SidebarContext} from "../store/SidebarFlag"
import {useRouter} from "next/router"
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Banner from "./Banner";
import Search from "./Search";
import {BackTop} from "antd"
import {VerticalAlignTopOutlined} from "@ant-design/icons"
import "../static/style/components/header.css"

import {searchReducer} from "../store/SearchFlag"

const backTopStyle = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: "50%",
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
}

const Header = ({navItem})=>{
    const router = useRouter()
    const [searchState,searchDispatch] = useReducer(searchReducer,false)

    return (
        <>
            <header className="header">
                <SidebarContext>
                    <Nav
                        navItem={navItem}
                        searchDispatch={searchDispatch}
                    />
                    <Sidebar navItem={navItem} />
                </SidebarContext>

                {router.route === "/" || router.route === "/category/[id]" || router.route === "/search/[text]" ? <Banner /> : ""}

                <BackTop className="back-top">
                    <div style={backTopStyle}>
                        <VerticalAlignTopOutlined/>
                    </div>
                </BackTop>

                <Search
                    status={searchState}
                />
            </header>
        </>
    )
}

export default Header