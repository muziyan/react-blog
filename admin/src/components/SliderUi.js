import React from "react";
import {Link} from "react-router-dom";
import { Menu } from 'antd';
import {  SettingOutlined,HomeOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const SliderUi = ()=>{
    return (
        <Menu
            style={{ width: 200 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub3']}
            mode="inline"
            theme="dark"
        >
            <Menu.Item key="1">
                <HomeOutlined/>
                <Link to="/">首页</Link>
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <SettingOutlined />
                        <span>用户管理</span>
                    </span>
                }
            >
                <Menu.Item key="2"><Link to="/user-add">用户添加</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/user-list">用户列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <SettingOutlined />
                        <span>导航管理</span>
                    </span>
                }
            >
                <Menu.Item key="4"><Link to="/nav-add">导航添加</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/nav-list">导航列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                title={
                    <span>
                        <SettingOutlined />
                        <span>内容管理</span>
                    </span>
                }
            >
                <Menu.ItemGroup title="栏目管理">
                    <Menu.Item key="6"><Link to="/category-add">栏目添加</Link></Menu.Item>
                    <Menu.Item key="7"><Link to="/category-list">栏目列表</Link></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="文章管理">
                    <Menu.Item key="8"><Link to="/article-add">文章添加</Link></Menu.Item>
                    <Menu.Item key="9"><Link to="/article-list">文章列表</Link></Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>
    )
}

export default SliderUi;