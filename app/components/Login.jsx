import React from 'react'

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'


const Login = ({handleSubmit, handleChange}) => (

  <div className="login form-inline">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input 
          onChange ={handleChange}
          name="email"
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          onChange ={handleChange}
          name="password"
          type="password"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Login!</button>
    </form>
  </div>
)




export default Login

