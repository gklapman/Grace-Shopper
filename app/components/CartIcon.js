import React from 'react'


import {connect, Link} from 'react-redux'




const CartIcon = () => (

  <div className="cart-icon">
    <span></span>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    // products: state.memes.products //what is the correct redux store and key for this
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