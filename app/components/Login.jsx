import React from 'react'

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'


const Login = ({handleSubmit, handleChange}) => (

  <div className="login form-inline container-fluid marg">
    <form onSubmit={handleSubmit}>
      <div className="col-md-1">
        <label className="centered-text nav-lab">Login</label><br />
      </div>
      <div className="col-md-11">
        <div className="form-group">
          <input 
            onChange ={handleChange}
            name="email"
            type="email"
            placeholder="email..."
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input 
            onChange ={handleChange}
            name="password"
            type="password"
            placeholder="password..."
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary item3">Login!</button>
      </div>
    </form>
  </div>
)




export default Login

