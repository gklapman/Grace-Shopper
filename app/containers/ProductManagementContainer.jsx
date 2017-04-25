import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import React from 'react'
import ManageProducts from '../components/ManageProducts'
import { editProduct } from '../reducers/meme'

class ProductManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      price: '',
      product: '',
      stock: '',
      photo: '',
      showForm: false,

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.editRow = this.editRow.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let putObject = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      photo: this.state.photo,
      product_info: this.state.product,
      stock: this.state.stock
    }
    editProduct(putObject)
    //.then and reset the local state and/or display a sucess message?
  }
  handleChange(event) {
    this.setState( {[event.currentTarget.name]: event.currentTarget.value})

  }
  editRow(event) {
    event.preventDefault()
    this.setState({showForm: !this.state.showForm})
    const id = event.target.value
    const value = this.props.memes.filter((el) => {
      return (el.id == id)
    })
    const meme = value[0]

    this.setState({
      id: meme.id,
      name: meme.name,
      price: meme.price,
      product: meme.product_info,
      stock: meme.stock,
      photo: meme.photo
    })
  }

  render() {
    return (
      <div>
        <h3>Product Management Panel</h3>
        <ManageProducts formState = {this.state} showForm={this.state.showForm} editRow={this.editRow} props={this.props.memes} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    memes: state.meme.memes,
    currentUser: state.auth
  }
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement)

