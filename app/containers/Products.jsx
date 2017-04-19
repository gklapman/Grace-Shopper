import React from 'react'
import {connect} from 'react-redux'
import Products from '../components/Products'
import {getMemes} from '../reducers/meme'

class ProductsContainer extends React.Component {
  componentDidMount() {
    this.props.getAllMemes()
  }

  render() {
    return (
      <Products products={this.props.memes} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    memes: state.meme.memes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMemes: () => dispatch(getMemes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)