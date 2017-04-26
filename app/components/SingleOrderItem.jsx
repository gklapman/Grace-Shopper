import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

const SingleOrderItem = (props) => {

let item = props.item
// const showitems = function(item){
//   if (item !==)
// }

console.log('this is item ', item)

  return (
     <div className="order-item">
      <h2 className='center'>Order Detail</h2>
            {item.meme ? 
              <div key={item.meme_id} className="row cart-item center">
                <h4 className='meme-name'>Meme Item: {item.meme.name}</h4>
                <img className='image' src={item.meme.photo}/>
                <span className='quantity'> Quantity: {item.quantity}</span>
                <span className="price"> Price per Meme: ${item.meme.price} </span>
                <h4>Purchaser: {item.user.name}</h4>
                <h5>Email: {item.user.email}</h5>
                <h5>Address: {item.user.address}</h5>
              </div> : null  }
  </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    item: state.pastorders.singleItem
  }
}

const MapDispatchToProps = null

export default connect(mapStateToProps, MapDispatchToProps)(SingleOrderItem)


