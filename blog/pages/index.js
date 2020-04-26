import React, {useState} from "react";
import Head from 'next/head'
import http from "../plugins/http";
import {Row,Pagination} from "antd";
import {EditFilled} from "@ant-design/icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleItem from "../components/ArticleItem";

const Home = (data) => {
    const [articles,setArticles] = useState(data.articles)
    const [page,setPage] = useState(0);
    const [pageSize,setPageSize] = useState(6);
    return(
        <>
            <Head>
                <title>季七呀！</title>
            </Head>
            <Header
                navItem={data.value}
            />
            <main className="main">
                <div className="container">
                    <Row className="notice" align="center">
                        <EditFilled style={{color:"#A0DAD0"}} className="edit-icon"/>:
                        <p> 这短短的一生我们最终都会失去，你不妨大胆一些，爱一个人，攀一座山，追一个梦。</p>
                    </Row>
                    <p style={{paddingBottom:'1em'}}>最新文章</p>
                    {
                        articles.slice(page*pageSize,(page+1)*pageSize).map((v, i) => {
                            return (
                                <ArticleItem
                                    key={v.path+i}
                                    path={v.path}
                                    title={v.title+v.id}
                                    cover={v.cover}
                                    desc={v.description}
                                    date={v.date.split(" ")[0]}
                                />
                            )
                        })
                    }
                    <Pagination
                        defaultCurrent={page+1}
                        hideOnSinglePage={true}
                        defaultPageSize={pageSize}
                        total={articles.length}
                        style={{textAlign:"center"}}
                        onChange={(page,pageSize)=>{
                            setPage(page - 1)
                            document.documentElement.scrollTop = 400;
                        }}
                    />
                </div>
            </main>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    const res = await http.get('/article')
    return {
        props: {
            articles:res.data.data
        }
    }
}

export default Home
