import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./app.scss"
import Login from "./pages/Login";
import Main from "./pages/Main"


const App = () => {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/" component={Main}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App