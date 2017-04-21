import React from 'react'

import {oauth} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export const Oauth = ({ oauth }) => {



return (
  <div className="oauth col-md-8">
 
    <a className="btn btn-default" href='api/auth/login/google'>Login with Google</a>
    
  </div>
)
}

const mapStateToProps = null
const mapDispatchToProps = {oauth}

export default connect(mapStateToProps, mapDispatchToProps)(Oauth)
