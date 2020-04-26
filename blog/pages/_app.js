import App from "next/app";
import "antd/dist/antd.css"
import "../static/style/pages/comm.css"

import http from "../plugins/http";

function MyApp({ Component, pageProps ,navs}) {
    return <Component {...pageProps} value={navs}/>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
    const navRes = await http.get('/nav')
    const categoryRes = await http.get('/category')
    const navs = navRes.data.data;
    const categories = categoryRes.data.data;
    navs.forEach(v=>{
        if (v.children){
            v.path = false;
            v.children = categories
        }
    })

  return { ...appProps ,navs}
}

export default MyApp
