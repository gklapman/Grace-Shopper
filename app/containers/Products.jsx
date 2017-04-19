import {connect} from 'react-redux'
import Products from '../components/Products'

const ProductsContainer = (props) => {
  return (
    <Products products={props.memes} />
  )
}

const mapStateToProps = (state) => {
  return {
    memes: state.meme.memes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)