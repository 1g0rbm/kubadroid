import React from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch} from "react-redux"
import {logout} from "../redux/authActions"

export default () => {
  const dispatch = useDispatch()

  const logoutHandler = event => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <nav >
      <div className="nav-wrapper blue lighten-2">
        <span className="brand-logo">Kubadroid</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/news">News</NavLink></li>
          <li><NavLink to="/programs">Programs</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}