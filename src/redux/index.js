import * as React from "react";

let context = React.createContext({});

const initState = { homePageData: null };

// 不要在这里进行异步操作
function reducer(state = {}, action) {
    switch (action.type) {
        case "ADD_HOMEPAGE_DATA":
            return Object.assign({}, state, action);
        default:
            throw new Error();
    }
}

export { context, reducer, initState };
