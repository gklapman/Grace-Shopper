import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import React from 'react'
import ManageProducts from '../components/ManageProducts'
import { editProduct, getMemes } from '../reducers/meme'
import axios from 'axios'


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
    this.addItem = this.addItem.bind(this)
    this.createItem = this.createItem.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(event)

    let putObject = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      photo: this.state.photo,
      product_info: this.state.product,
      stock: this.state.stock,
    }
    //console.log(editProduct)

    axios.put(`/api/memes/edit/${this.state.id}`, putObject)
    .then(data => {
        console.log('response for edit mem put', data)
    })


    //editProduct(putObject)
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


  addItem(event) {
    event.preventDefault()
    this.setState({showForm: !this.state.showForm})
    console.log('hit button')
  }

  createItem(event) {
      let putObject = {
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        photo: this.state.photo,
        product_info: this.state.product,
        stock: this.state.stock,
      }
    return axios.post('/api/memes/add', putObject)
      .then(data => {
        this.setState({
          id: '',
          name: '',
          price: '',
          product: '',
          stock: '',
          photo: '',
          showForm: false
        })
      })
      // .then(function() {
      //   console.log('')
      //   this.props.getMemes()
      // })
  }

  render() {
    return (
      <div>
        <h3>Product Management Panel</h3>
        <ManageProducts createItem={this.createItem} addItem={this.addItem} formState = {this.state} showForm={this.state.showForm} editRow={this.editRow} props={this.props.memes} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
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
const mapDispatchToProps = {
  getMemes
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement)

