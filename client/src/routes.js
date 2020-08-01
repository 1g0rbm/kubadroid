import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {NewsPage} from "./components/pages/NewsPage";
import {BroadcastsPage} from "./components/pages/BroadcastsPage";
import AuthPage from "./components/pages/AuthPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={"/news"} exact>
          <NewsPage/>
        </Route>
        <Route path={"/broadcasts"} exact>
          <BroadcastsPage/>
        </Route>
        <Redirect to="/broadcasts"/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}
