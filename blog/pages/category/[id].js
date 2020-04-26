import React, {useState} from "react";
import http from "../../plugins/http";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategoryUi from "../../components/CategoryUi"
import Head from "next/head";


const Category = props=>{
    const [category,setCategory] = useState(props.data.category)
    const [articles,setArticles] = useState(props.data.articles)
    return (
        <>
            <Head>
                <title>季七呀！-- {category[0].category_name}</title>
            </Head>
            <Header
                navItem={props.value}
            />
            <CategoryUi
                category={category}
                articles={articles}
            />
            <Footer/>
        </>
    )
}

export async function getStaticPaths() {
    const res = await http.get('/category')
    const categories = res.data.data;
    const paths = categories.map(category => `/category/${category.id}`)
    return {paths,fallback:false}
}

export async function getStaticProps({params}) {
    const res = await http.get(`/category/${params.id}`)
    const {articles,category} = res.data.data;
    return { props: {
            data:res.data.data
        }}
}

export default Category