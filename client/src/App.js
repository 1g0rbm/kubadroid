import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {useRoutes} from "./routes"
import {useSelector} from "react-redux"
import './App.css'
import 'materialize-css'

function App() {
  const {token} = useSelector(({authData}) => authData)
  const routes = useRoutes(!!token)
  return (
    <BrowserRouter>
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App
