import React from 'react'

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import {loadItems} from '../reducers/cart'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name"><strong>{user && user.name} </strong></span>
    <button className="logout btn btn-default" onClick={logout}>Logout</button>
  </div>
)


export default connect(
  ({ auth }) => ({ user: auth }),
  (dispatch) => {return {logout: () => {
    dispatch(logout())
    dispatch(loadItems())
  }}},
)(WhoAmI)
