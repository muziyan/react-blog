import React, {useState} from "react";
import Router from "next/router";
import {SearchOutlined} from "@ant-design/icons"
import "../static/style/components/search.css"

const SearchComponent = ({status})=>{
    const [searchText,setSearchText] = useState("")
    return (
        <div className="search">
            <div className={status ? "search-box search-show" : 'search-box search-hide'}>
                <div className="media">
                    <h3 className="title">你想搜索的文章...</h3>
                    <div className="input-box">
                        <input
                            type="search"
                            value={searchText}
                            onChange={e=>setSearchText(e.target.value)}
                            placeholder="请输入文章关键字..."/>
                        <button
                            type="submit"
                            onClick={()=>{
                                Router.push(`/search/${searchText}`)
                            }}
                        >
                            <SearchOutlined/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchComponent;