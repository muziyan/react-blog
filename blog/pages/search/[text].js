import React, {useEffect, useState} from "react";
import Head from "next/head";
import Router from "next/router";
import http from "../../plugins/http";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleItem from "../../components/ArticleItem";
import "../../static/style/pages/search.css"



const Search = props =>{
    const {router} = Router
    const [keyword,setKeyword] = useState("");
    const [articles,setArticles] = useState(props.articles)
    useEffect(()=>{
        if (router.query.text){
            setKeyword(router.query.text)
        }
    })
    return (
        <>
            <Head>
                <title>季七呀！</title>
            </Head>
            <Header
                navItem={props.value}
            />
            <main className="container">
                <div className="results-text">
                    <p>{`搜索结果:包含关键字${keyword}的文章`}</p>
                </div>
                <div className="results-body">
                    {
                        articles.length > 0 ? articles.map(article => (
                            <ArticleItem
                                key={article.id}
                                path={article.path}
                                title={article.title}
                                cover={article.cover}
                                desc={article.description}
                                date={article.date.split(" ")[0]}
                            />
                        )) : (
                            <div>没有包含关键字{keyword}的文章</div>
                        )
                    }
                </div>
            </main>
            <Footer/>
        </>
    )
}

export async function getServerSideProps({query}) {
    const res = await http.get(`/article/search/${query.text}`);
    return {
        props:{
            articles:res.data.data
        }
    }
}

export default Search;