import React from 'react'


import {connect} from 'react-redux'

import {Link} from 'react-router'




const CartIcon = ({cartItems, currentUser}) => {


return (
  <div className="cart-icon">
    <Link to="/cart">
      <span>My Cart </span>
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

  // <div className="cart-icon">
  //   <Link to="/cart">
  //     <span className="cart-items">{props.products.length}</span> 
  //     <span class="glyphicon glyphicon-shopping-cart"></span>
  //   </Link>
  // </div>