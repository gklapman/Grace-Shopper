import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import React from 'react'


class AdminPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        <h1>Welcome, admin.  <img style={{height: "100px"}} src="https://www.mememaker.net/static/images/memes/3686571.jpg" alt=""/></h1>
        <ul class="breadcrumb">
          <li>
             <Link to={`/admin/productManagement`}>Product Management</Link>
          </li>
          <li>
             <Link to={`/admin/orderManagement`}>Order Management</Link>
          </li>
          <li>
            <Link to={`/admin/userManagement`}>User Management</Link>
          </li>
        </ul>

        <div style={{border: "solid black 2px", padding: '10px'}} className="">
          {this.props.children}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)

