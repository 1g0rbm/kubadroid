import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {NewsPage} from "./components/pages/NewsPage";
import {ProgramsPage} from "./components/pages/ProgramsPage";
import AuthPage from "./components/pages/AuthPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={"/news"} exact>
          <NewsPage/>
        </Route>
        <Route path={"/programs"} exact>
          <ProgramsPage/>
        </Route>
        <Redirect to="/programs"/>
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
