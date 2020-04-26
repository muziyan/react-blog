import React, {createContext, useReducer} from "react";

export const FlagContext = createContext({})

export const HIDE_SIDEBAR = "HIDE_SIDEBAR"
export const SHOW_SIDEBAR = "SHOW_SIDEBAR"

const reducer = (state,action) =>{
    switch (action.type) {
        case HIDE_SIDEBAR:
            return state = false;
        case SHOW_SIDEBAR:
            return state = true;
        default:
            return state;
    }
}

export const SidebarContext = props =>{
    const [flag,dispatch] = useReducer(reducer,1);
    return (
        <FlagContext.Provider value={{flag,dispatch}} >
            {props.children}
        </FlagContext.Provider>
    )
}
