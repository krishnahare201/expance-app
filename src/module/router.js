import React, { lazy, Suspense } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import { Spin } from "antd";
import { Cookies } from "react-cookie";
const cookie = new Cookies();

const Signup = lazy(() => import("./signup/index"));
const Login = lazy(() => import("./login/login"));
const Expanse = lazy(() => import("./expanse/expanse"));

const redirect = pathname => () => {
  return <Redirect to={{ pathname }} />;
};

export const Routes = props => {
  return (
    <main>
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                margin: "auto",
                paddingTop: 50,
                textAlign: "center"
              }}
            >
              <Spin />
            </div>
          }
        >
          <Switch>
            <Route exact path="/" render={redirect("login")} />
            <Route
              path="/login"
              exact
              render={() => {
                if (!cookie.get("token")) {
                  return <Login {...props} />;
                } else {
                  return (
                    <Redirect
                      to={{
                        pathname: "/expanse",
                        state: { from: props.location }
                      }}
                      push={false}
                    />
                  );
                }
              }}
            />
            <Route
              path="/expanse"
              exact
              render={() => {
                if (cookie.get("token")) {
                  return <Expanse {...props} />;
                } else {
                  return (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: props.location }
                      }}
                      push={false}
                    />
                  );
                }
              }}
            />
            <Route exact path="/signup" render={() => <Signup {...props} />} />
            <Route exact path="/login" render={() => <Login {...props} />} />
            <Route exact path="/expanse" render={() => <Expanse {...props} />} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

const ContentRoute = props => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            paddingTop: 50,
            textAlign: "center"
          }}
        >
          <Spin />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" render={redirect("expanse")} />
        <Route exact path="/" render={() => <Expanse {...props} />} />



      </Switch>
    </Suspense>
  );
};
export default Routes;