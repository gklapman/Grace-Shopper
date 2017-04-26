import React from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {checkout} from '../reducers/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: props.currentUser.address || '',
      email: props.currentUser.email || '',
      hidden: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleHidden = this.toggleHidden.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (val, key) => {
    this.setState({[key]: val})
  }

  toggleHidden = () => {
    let bool = !this.state.hidden
    this.setState({hidden: bool})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    this.props.checkout()
    window.alert('Your order has been received')
    browserHistory.push('/')
  }

  render() {
    return (
      <div className="checkout">
        <button onClick={this.toggleHidden} className="btn btn-default">Checkout</button>
        <br />
        {this.state.hidden ? null :
        <form onSubmit={this.handleSubmit}>
          <div className="col-md-6">
            <label>Email</label>
            <input className="form-control" type="text" value={this.state.email} onChange={(e) => {this.handleChange(e.target.value, 'email')}}/>
          </div>
          <div className="col-md-6">
            <label>Address</label>
            <input className="form-control" type="text" value={this.state.address} onChange={(e) => {this.handleChange(e.target.value, 'address')}}/>
          </div>
          <br />
          <button className="btn btn-submit btn-checkout">Order me some dank memes!</button>
          <br />
          <br />
        </form>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {return {currentUser: state.auth}}
const mapPropsToDispatch = (dispatch) => {return {checkout: () => dispatch(checkout())}}

export default connect(mapStateToProps, mapPropsToDispatch)(Checkout)