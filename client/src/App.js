import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {useRoutes} from "./routes"
import {useSelector} from "react-redux"
import './App.css'
import 'materialize-css'
import Navbar from "./components/Navbar";

function App() {
  const {token} = useSelector(({authData}) => authData)
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar/>}
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  )
}

export default App
