import React from "react";
import Link from "next/link"
import {Row,Col} from "antd"
import {MoreOutlined,FieldTimeOutlined} from "@ant-design/icons"
import ReactMarkdown from "react-markdown"
import "../static/style/components/article-item.css"

const ArticleItem = props =>{
    return (
        <div>
            <article className="article-item">
                <Row align="center" justify="center">
                    <Col span="24" md={4}>
                        <Link href={props.path}>
                            <img src={props.cover} alt="image"  className="article-cover"/>
                        </Link>
                    </Col>
                    <Col span="24" md={20} className="article-main">
                        <div className="article-head">
                                <h3 className="article-title">
                                    <Link href={props.path}>
                                        <a>
                                            {props.title}
                                        </a>
                                    </Link>
                                </h3>
                                <span className="date">
                                    <FieldTimeOutlined style={{marginRight:"3px"}}/>
                                    {props.date}
                                </span>
                        </div>
                        <div className="article-body">
                            <ReactMarkdown
                                source={props.desc}
                                escapeHtml={false}
                            />
                            {/*<p>{props.context.slice(0,100)}...</p>*/}
                        </div>
                        <div className="article-more">
                            <Link href={props.path}>
                                <MoreOutlined className="more-icon"/>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </article>
        </div>
    )
}

export default ArticleItem