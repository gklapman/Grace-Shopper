import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import React from 'react'

class ProductManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Product Management Panel</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement)

