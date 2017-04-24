import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import React from 'react'

class AdminPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <h1>Welcome, James.</h1>
        {this.props.children}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)

