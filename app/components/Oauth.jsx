import React from 'react'

import {oauth} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export const Oauth = ({ oauth }) => {



return (
  <div>
 
    <a className="btn btn-nav" href='api/auth/login/google'>Login with Google</a>
    
  </div>
)
}

const mapStateToProps = null
const mapDispatchToProps = {oauth}

export default connect(mapStateToProps, mapDispatchToProps)(Oauth)
