import React from 'react'

import {oauth} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export const Oauth = ({ oauth }) => {



return (
  <div className="oauth">
    <a href='api/auth/login/facebook'>Login with Facebook</a>
  </div>
)
}

const mapStateToProps = null
const mapDispatchToProps = {oauth}

export default connect(mapStateToProps, mapDispatchToProps)(Oauth)
