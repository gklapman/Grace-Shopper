import React from 'react'
import {connect} from 'react-redux'
import {addCartItem} from '../reducers/cart.jsx'


class Cart extends React.Component {
  constructor(props) {
    super(props);
    
    this.addToCart = this.addToCart.bind(this)
  }


    addToCart(event){
        let userId = this.props.currentUser.id
        let productId = event.target.value
        this.props.addCartItem(productId, userId)
      }

  render() {
    const cart = this.props.cart

  
    return (

      <div className="container-fluid center" style={{backgroundColor: 'white'}}>
        {cart.length > 0 ? <h2>My Cart</h2>: <h2>You can only view your own cart</h2> }
          {cart && cart.map(item=> {
            return <div key={item.meme_id} className="row cart-item">
              <h5 className='center'>Meme Item: {item.meme.name}</h5>
              <img className='center' src={item.meme.photo} style={{height: 50, width: 50}}/>
              <span className='center'> Quantity: {item.quantity}</span>
              <button className='center' value={item.meme_id} onClick={this.addToCart}>+</button>
              
            </div>
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

const mapDispatchToProps = {addCartItem}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)