import React from 'react'
import {connect} from 'react-redux'
import Products from '../components/Products'
import Sidebar from '../components/Sidebar'
import Adbar from '../components/Adbar'
import {getMemes} from '../reducers/meme'
import {addItem} from '../reducers/cart'

class ProductsContainer extends React.Component {

//eventually it'd be great to refactor this wrapped view to whole site as a mega container
  render() {
    return (
      <Products products={this.props.memes} addItem={this.props.addItem} currentUser={this.props.currentUser} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    memes: state.meme.memes,
    currentUser: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {addItem}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)