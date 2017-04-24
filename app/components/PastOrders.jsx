import React from 'react'
import {connect} from 'react-redux'
import {addCartItem} from '../reducers/cart.jsx'

import {Link} from 'react-router'


class PastOrders extends React.Component {
  constructor(props) {
    super(props);
    
  }


  

  render() {
    const pastorders = this.props.pastorders

    console.log('past orders are ', this.props.pastorders)

  
    return (

      <div className="container-fluid center" style={{backgroundColor: 'white'}}>
        {pastorders && pastorders.length > 0 ? <h2>My Past Orders</h2>: <h3> You have no past orders. Click <Link to="/products">HERE</Link> to add items to your cart</h3>}
          {pastorders && pastorders.map(item=> {
            return <div key={item.meme_id} className="row cart-item">
              <h5 className='center'>Meme Item: {item.meme.name}</h5>
              <img className='center' src={item.meme.photo} style={{height: 50, width: 50}}/>
              <span className='center'> Quantity: {item.quantity}</span>
            
              
            </div>
          })}
         
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.pastorders.pastorders,
    currentUser: state.auth
  }
}

const mapDispatchToProps = null


export default connect(mapStateToProps, mapDispatchToProps)(PastOrders)