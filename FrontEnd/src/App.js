import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { routes } from "./constants";
import ParentView from "./Login/ParentView";
import { SideBar } from "./SideBar";
import "./styles.css";
import { isLoggedIn } from "./utils";

export default function App() {
  if(!isLoggedIn()) return <ParentView />;

  return (
    <div className="App">
      <div className="display-flex">
        <div style={{ flex: 0.5, height: "100vh" }}>
          <SideBar />
        </div>
        <div style={{ flex: 2, padding: "2% 1%", backgroundColor: 'white' }}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
            <Redirect from={"/"} to={"/profile"} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
