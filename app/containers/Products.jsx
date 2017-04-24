import React from 'react'
import {connect} from 'react-redux'
import Products from '../components/Products'
import Sidebar from '../components/Sidebar'
import Adbar from '../components/Adbar'
import {getMemes} from '../reducers/meme'
import {addCartItem} from '../reducers/cart.jsx'

class ProductsContainer extends React.Component {

//eventually it'd be great to refactor this wrapped view to whole site as a mega container
  render() {
    return (
<<<<<<< HEAD
      <div className="container-fluid">
        <Sidebar />
        <div className="col-md-8">
          <Products products={this.props.memes} addCartItem={this.props.addCartItem} currentUser={this.props.currentUser} />
        </div>
        <Adbar />
      </div>
=======
      <Products products={this.props.memes} addItem={this.props.addItem} currentUser={this.props.currentUser} />
>>>>>>> 750d3ecb544129a8ab9d02c3adb761bf5f03fa20
    )
  }
}

const mapStateToProps = (state) => {
  return {
    memes: state.meme.memes,
    currentUser: state.auth
  }
}

const mapDispatchToProps = {addCartItem}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)