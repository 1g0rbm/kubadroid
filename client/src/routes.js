import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {NewsPage} from "./Pages/NewsPage";
import {ProgramsPage} from "./Pages/ProgramsPage";
import {AuthPage} from "./Pages/AuthPage";

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
