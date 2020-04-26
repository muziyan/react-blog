import React from "react";
import Head from 'next/head'
import http from "../../plugins/http";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleMain from "../../components/ArticleMain";

const Article = ({article,value})=>{
    return (
        <>
            <Head>
                <title>季七呀！-- {article.title}</title>
            </Head>
            <Header
                navItem={value}
            />
            <ArticleMain
                article={article}
            />
            <Footer/>
        </>
    )
}

export async function getStaticPaths() {
    const res = await http.get('/article')
    const articles = res.data.data;
    const paths = articles.map(article => `/article/${article.id}`)
    return {paths,fallback:false}
}

export async function getStaticProps({params}) {
    const res = await http.get(`/article/${params.id}`)
    return { props: {
        article:res.data.data
    }}
}

export default Article