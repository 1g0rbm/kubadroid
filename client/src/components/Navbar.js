import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import {useDispatch} from "react-redux"
import {logout} from "../redux/auth/authActions"
import classnames from "classnames";

export default () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const logoutHandler = event => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <nav>
      <div className="nav-wrapper blue lighten-2">
        <span className="brand-logo">Kubadroid</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className={classnames({active: location.pathname === '/news'})}>
            <NavLink to="/news">News</NavLink>
          </li>
          <li className={classnames({active: location.pathname === '/broadcasts'})}>
            <NavLink to="/broadcasts">Programs</NavLink>
          </li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}
