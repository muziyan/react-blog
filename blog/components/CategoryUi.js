import React from "react";
import ArticleItem from "./ArticleItem";
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";

const Bread = props =>(
    <Breadcrumb style={{marginBottom:"30px"}}>
        <Breadcrumb.Item href="/">
            <HomeOutlined />
            <span>首页</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <span>{props.title}</span>
        </Breadcrumb.Item>
    </Breadcrumb>
)


const Category = props => (
    <>
        <div className="main" style={{marginTop:"30px"}}>
            <div className="container">
                    <Bread
                        title={props.category[0].category_name}
                    />
                    {
                        props.articles.map((v,i)=>{
                            return (
                                <ArticleItem
                                    key={v.path+i}
                                    path={v.path}
                                    title={v.title}
                                    cover={v.cover}
                                    desc={v.description}
                                    date={v.date.split(" ")[0]}
                                />
                            )
                        })
                    }
                    {/*<Pagination*/}
                    {/*    defaultCurrent={props.page+1}*/}
                    {/*    hideOnSinglePage={true}*/}
                    {/*    defaultPageSize={props.pageSize}*/}
                    {/*    total={props.articles.length}*/}
                    {/*    style={{textAlign:"center"}}*/}
                    {/*    onChange={(page,pageSize)=>{*/}
                    {/*        props.setPage(page - 1)*/}
                    {/*        document.documentElement.scrollTop = 400;*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
        </div>
    </>
)

export default Category