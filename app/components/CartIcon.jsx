import React from 'react'


import {connect} from 'react-redux'

import {Link} from 'react-router'




const CartIcon = ({cartItems, currentUser}) => {


return (
  <div className="cart-items">
   <Link to={`/cart`}>
     <span>My Cart </span>
    </Link>
    <Link to={`/pastorders`}>
    <span>My Past Orders</span>
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

