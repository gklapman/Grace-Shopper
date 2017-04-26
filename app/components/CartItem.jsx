import React from 'react'


import {connect} from 'react-redux'


const CartItem = ({item, removeFromCart, addToCart}) => {

  return (
    <div className="cart-item">
            {item.meme && item.quantity > 0 ? 
              <div key={item.meme_id} className="row cart-item">
                <h4 className='meme-name'>Meme Item: {item.meme.name}</h4>
                <img className='image' src={item.meme.photo}/>
                <span className='quantity'> Quantity: {item.quantity}</span>
                <span className="price"> Price per Meme: ${item.meme.price} </span>
                <button value={item.meme_id} onClick={addToCart}>+</button>
                <button value={item.meme_id} onClick={removeFromCart}>-</button>
              </div> : null  }
  </div>
  )
}




export default CartItem