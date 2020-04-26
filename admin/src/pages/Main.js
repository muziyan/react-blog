import React, {useEffect, useState} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Layout, message,Row,Col,Button} from "antd";
import SliderUi from "../components/SliderUi";
import Home from "./Home";
import UserEdit from "./user/UserEdit";
import UserList from "./user/UserList";
import NavList from "./nav/NavList";
import NavEdit from "./nav/NavEdit";
import CategoryList from "./category/CategoryList";
import CategoryEdit from "./category/CategoryEdit";
import ArticleList from "./article/ArticleList";
import ArticleEdit from "./article/ArticleEdit";
import http from "../plugins/http";

const {Header, Sider, Content} = Layout

const Main = props => {

    const [user,setUser] = useState(false)

    http.interceptors.response.use(res=>{
        return res;
    },err =>{
        let errStatus = err.response.status;
        if (errStatus === 401){
            message.error(err.response.statusText)
            props.history.push("/login")
        }
        return Promise.reject(err)
    })

    useEffect(()=>{
        if (!localStorage.token){
            props.history.push("/login")
        }
        if (localStorage.token && !user){
            http.get("/getUser").then(res =>{
                setUser(res.data.user)
            })
        }
    },[localStorage.token])

    const logout = ()=>{
        localStorage.clear()
        message.success("logout success!")
        props.history.push("/login")
    }

    return (
        <>
            <Router>
                <Layout>
                    <Sider
                        className="site-layout-background"
                    >
                        <SliderUi/>
                    </Sider>
                    <Layout>
                        <Header
                            className="head-layout"
                        >
                            <Row
                                justify="space-between"
                            >
                                <Col span={12}>
                                    <h3>季气呀！后台管理系统</h3>
                                </Col>
                                <Col span={12} style={{textAlign:"right"}}>
                                    <Button type="primary" onClick={logout}>logout</Button>
                                </Col>
                            </Row>
                        </Header>
                        <Content
                            className="content-layout"
                        >
                                {/*home router*/}
                                <Route exact path="/" component={Home}/>
                                {/*user router*/}
                                <Route exact path="/user-add" component={UserEdit}/>
                                <Route exact path="/user-edit/:id" component={UserEdit}/>
                                <Route exact path="/user-list" component={UserList}/>
                                {/*nav router*/}
                                <Route exact path="/nav-list" component={NavList}/>
                                <Route exact path="/nav-add" component={NavEdit}/>
                                <Route exact path="/nav-edit/:id" component={NavEdit}/>
                                {/*category router*/}
                                <Route exact path="/category-list" component={CategoryList}/>
                                <Route exact path="/category-add" component={CategoryEdit}/>
                                <Route exact path="/category-edit/:id" component={CategoryEdit}/>
                                {/* article router */}
                                <Route exact path="/article-list" component={ArticleList}/>
                                <Route exact path="/article-add" component={ArticleEdit}/>
                                <Route exact path="/article-edit/:id" component={ArticleEdit}/>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </>
    );
}

export default Main;