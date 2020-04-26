import React from "react";

import "../static/style/components/banner.css"

const Banner = ()=>{
    return (
        <>
            <div className="banner">
                <div className="slant-left"/>
                <div className="slant-right"/>

                <div className="info">
                    <div className="avatar">
                        <img className="avatar-img" src="https://api.vvhan.com/api/qt?qq=997432833" alt="avatar"/>
                    </div>
                    <div className="context">
                        <p>
                            对自己温柔点，你只不过是宇宙的孩子，与植物、星辰没什么两样。
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner