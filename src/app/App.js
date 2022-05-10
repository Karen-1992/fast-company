import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Edit from "./layouts/edit";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/edit" component={Edit} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};
export default App;
