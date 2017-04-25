import React from 'react'

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'


const Login = ({handleSubmit, handleChange}) => (

  <div className="login form-inline col-md-8">
    <form onSubmit={handleSubmit}>
      <div className="col-md-2 lab">
        <label>Email</label><br />
        <label>Password</label>
      </div>
      <div className="col-md-10">
        <div className="form-group">
          {/*<label className="col-md-4">Email</label>*/}
          <input 
            onChange ={handleChange}
            name="email"
            type="email"
            className="form-control"
          />
        </div>
        <br />
        <div className="form-group">
          {/*<label className="col-md-4">Password</label>*/}
          <input 
            onChange ={handleChange}
            name="password"
            type="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login!</button>
      </div>
    </form>
  </div>
)




export default Login

