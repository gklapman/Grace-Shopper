import React from 'react'
import {connect} from 'react-redux'
import {addCartItem, removeCartItem} from '../reducers/cart.jsx'

import {Link} from 'react-router'


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
        console.log('the memeId is ', memeId )
        this.props.removeCartItem(memeId)
      }

  render() {
    const cart = this.props.cart

 // TODO: write each cart item as own component
    return (

      <div className="container-fluid center" style={{backgroundColor: 'white'}}>
        {cart.length > 0 ? <h2>My Cart</h2>: <h3> Your Cart is Empty. Click <Link to="/products">HERE</Link> to add items to your cart</h3>}
          {cart && cart.map(item=> {
            return (
            item.meme && item.quantity > 0 ? 
              <div key={item.meme_id} className="row cart-item">
                <h5 className='center'>Meme Item: {item.meme.name}</h5>
                <img className='center' src={item.meme.photo} style={{height: 50, width: 50}}/>
                <span className='center'> Quantity: {item.quantity}</span>
                <button className='center' value={item.meme_id} onClick={this.addToCart}>+</button>
                <button value={item.meme_id} onClick={this.removeFromCart}>-</button>
              </div> : null
            ) 
          })}
         
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


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
