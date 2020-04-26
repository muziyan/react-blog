import React, {createContext, useReducer} from "react";

export const TOGGLE_SEARCH = "TOGGLE_SEARCH"

export const SearchFlagContext = createContext({})

export const searchReducer = (state,action) =>{
    switch (action.type) {
        case TOGGLE_SEARCH:
            return !state;
        default:
            return state;
    }
}
