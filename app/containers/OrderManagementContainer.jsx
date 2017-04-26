import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import React from 'react'
import ManageOrders from '../components/ManageOrders'
import OrderItem from '../components/OrderItem'


class OrderManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const allOrders = this.props.allOrders
    return (
      <div>
        <h1>Order Management Panel</h1>
        {allOrders && allOrders.map(order => {
          return (<OrderItem item={order}/>)
        })}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    allOrders: state.pastorders.allitems
  }
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagement)

