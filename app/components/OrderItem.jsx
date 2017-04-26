import React from 'react'


import {connect} from 'react-redux'
import {Link} from 'react-router'


const OrderItem = ({item}) => {



  return (
    <div className="order-item">
      <Link to={`/admin/ordermanagement/${item.id}`}>
              <div key={item.meme_id} className="row cart-item">
                <h4 className='meme-name'>Meme Item: {item.meme.name}</h4>
                <h5 className='purchaser'>Purchaser: {item.user.name}</h5>
                <img className='image' src={item.meme.photo}/>
                <span className='quantity'> Quantity: {item.quantity}</span>
              </div> 
        </Link>
  </div>
  )
}




export default OrderItem