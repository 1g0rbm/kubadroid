import React from "react"
import {useDispatch, useSelector} from "react-redux"
import RegistrationPage from "./RegistrationPage"
import LoginPage from "./LoginPage";
import {switchAuthForm} from "../redux/authFormActions";

export default () => {

  const selectedForm = useSelector(({authFormSwitch}) => authFormSwitch)
  const dispatch = useDispatch()

  const toLogin = () => dispatch(switchAuthForm('login'))
  const toRegistration = () => dispatch(switchAuthForm('registration'))

  return (
    <div className="card">
      <div className="card-content">
        <div className="row auth-form">
          <div className="col s6 auth-form-switch">
            <h1 className="center">Account</h1>
            <div className="actions">
              <button
                className="waves-effect waves-light btn-small"
                onClick={toRegistration}
              >
                Registration
              </button>
              <button
                className="waves-effect waves-light btn-small"
                onClick={toLogin}
              >
                Login
              </button>
            </div>
          </div>
          <div className="col s6">
            {selectedForm === 'login' && <LoginPage/>}
            {selectedForm === 'registration' && <RegistrationPage/>}
          </div>
        </div>
      </div>
    </div>
  )
}
