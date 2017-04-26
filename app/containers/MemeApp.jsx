import React from 'react'
import {connect} from 'react-redux'
import CartIcon from '../components/CartIcon.jsx'
import LoginLogoutContainer from './LoginLogoutContainer.jsx'
import SearchContainer from './SearchContainer.jsx'
import Sidebar from '../components/Sidebar'
import Adbar from '../components/Adbar'

const MemeApp = ({user, children}) => {
  return (
    <div>
      <nav className="navbar navbar-default flex">
        <div className="">
          <LoginLogoutContainer />
        </div>
        <div className="">
          <SearchContainer />
        </div>
        <div className="">
          <CartIcon />
        </div>
      </nav>
      <div className="container-fluid">
        <Sidebar />
        <div  id="content" className="col-md-8">
          {children}
        </div>
        <Adbar />
      </div>
    </div>
  )
}

export default connect(({ auth }) => ({ user: auth }))(MemeApp)