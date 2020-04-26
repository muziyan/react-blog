import React from "react";
import ReactMarkdown from "react-markdown"
import 'markdown-navbar/dist/navbar.css';
import {Row,Col,Breadcrumb} from "antd"
import { HomeOutlined } from '@ant-design/icons';
import "../static/style/components/article-main.css"

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

const ArticleMain = props =>{
    const {article}  = props
    return (
        <div>
            <article className="article-text">
                <div className="article-cover" style={{backgroundImage:`url("${article.cover}")`}}>
                    <div className="article-head-box">
                        <h3 className="article-title">{article.title}</h3>
                        <div className="article-desc">
                            <ReactMarkdown
                                source={article.description}
                                escapeHtml={false}
                            />
                        </div>
                    </div>
                </div>
                <div className="article-main">
                    <Bread title={article.title} />
                    <Row justify={"space-between"}>
                        <Col span={24} md={14} lg={16}>
                            <ReactMarkdown
                                source={article.context}
                                escapeHtml={false}
                            />
                        </Col>
                    </Row>
                </div>
            </article>
        </div>
    )
}

export default ArticleMain