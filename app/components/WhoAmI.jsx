import React from 'react'
import {browserHistory} from 'react-router'
import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

const openAdmin = () => {
  browserHistory.push('/admin')
}

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name"><strong>{user && user.name} </strong></span>
    <button className="logout btn btn-default" onClick={logout}>Logout</button>
    {user.admin ? <button className="btn btn-default" onClick={openAdmin}>Admin Panel</button> : null}
  </div>
)


export default connect(
  ({ auth }) => ({ user: auth }),
  {logout}
)(WhoAmI)
