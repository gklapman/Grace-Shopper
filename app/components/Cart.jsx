import React from 'react'
import {connect} from 'react-redux'
import {addCartItem, removeCartItem} from '../reducers/cart.jsx'
import CartItem from './CartItem.jsx'

import {Link} from 'react-router'
import Checkout from './Checkout'


class Cart extends React.Component {
  constructor(props) {
    super(props);
    
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }


    addToCart(event){
        let userId = this.props.currentUser.id
        let productId = event.target.value
        this.props.addCartItem(productId, userId)
      }

      removeFromCart(event){
        let memeId = event.target.value
        this.props.removeCartItem(memeId)
      }

  render() {
    const cart = this.props.cart

    let total = 0;
    cart.forEach(item => {
      total += item.quantity * Number(item.meme.price)
    })

    return (
      <div className="container-fluid center green myitems">
        {cart.length > 0 ? <h2 className="center">My Cart</h2>: <h3> Your Cart is Empty. Click <Link to="/products">HERE</Link> to add items to your cart</h3>}
        {cart.length > 0 ? <Checkout /> : null}
          {cart && cart.map(item=> {
             return (
              <div key={item.meme_id}>
              <CartItem item={item} addToCart={this.addToCart} removeFromCart={this.removeFromCart}/>
              </div>
            )
          })}
          <h5 className='total'>Total: ${total.toFixed(2)} </h5>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    currentUser: state.auth
  }
}

const mapDispatchToProps = {addCartItem, removeCartItem}

// 

   // return (
   //          item.meme && item.quantity > 0 ? 
   //            <div key={item.meme_id} className="row cart-item">
   //              <h4 className='meme-name'>Meme Item: {item.meme.name}</h4>
   //              <img className='image' src={item.meme.photo}/>
   //              <span className='quantity'> Quantity: {item.quantity}</span>
   //              <span className="price"> Price per Meme: ${item.meme.price} </span>
   //              <button value={item.meme_id} onClick={this.addToCart}>+</button>
   //              <button value={item.meme_id} onClick={this.removeFromCart}>-</button>

   //            </div> : null
   //          )


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
