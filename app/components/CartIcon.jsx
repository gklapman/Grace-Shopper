import React from 'react'


import {connect} from 'react-redux'

import {Link} from 'react-router'




const CartIcon = ({cartItems, currentUser}) => {


return (
  <div className="cart-items item3">
   <Link to="/cart">
     <button className="btn btn-nav">My Cart </button>
    </Link>
    <Link to={`/pastorders`}>
      <button className="btn btn-nav">My Past Orders</button>
    </Link>
  </div> 
  
)
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartItems: state.cart.cart,
    currentUser: state.auth
  }
  
}

const MapDispatchToProps = null


export default connect(mapStateToProps, MapDispatchToProps)(CartIcon);

