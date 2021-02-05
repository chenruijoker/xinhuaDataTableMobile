import * as React from "react";
import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import Tables from "./components/Tables";
import { GetHomePageInfo } from "./tools/api";
import { context, reducer, initState } from "./redux/index";


const { useEffect, useReducer } = React;

function App(props) {
    const store = useReducer(reducer, initState);

    useEffect(() => {
        GetHomePageInfo().then((res) => {
            if (res.code && Number(res.code) == 200) {
                const data = {
                    type: "ADD_HOMEPAGE_DATA",
                    homePageData: res.data,
                };
                store[1]({ ...data });
            }
        });
    }, []);

    return (
        <context.Provider value={store}>
            <div>
                <Switch>
                    <Route path="/homepage" exact component={HomePage} />
                    <Route path="/tables/:id" component={Tables} />
                    <Redirect exact to="/homepage" from="/" />
                </Switch>
            </div>
        </context.Provider>
    );
}

export default App;
