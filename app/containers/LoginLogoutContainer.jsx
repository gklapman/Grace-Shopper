import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React from 'react';
import Login from '../components/Login.jsx'
import WhoAmI from '../components/WhoAmI.jsx'
import Oauth from '../components/Oauth.jsx'
import SignUpContainer from './SignUpContainer.jsx'
import {login} from 'APP/app/reducers/auth'

class LoginContainer extends React.Component {
    constructor(props) {
		super(props);
		this.state =
			{email: '', password: ''}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkUser = this.checkUser.bind(this);
	}


	handleChange(event){
		let name = event.target.name
		this.setState({
			[name]: event.target.value
		})
	}



	handleSubmit(event){
		event.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		this.props.login(email, password)
	}

	checkUser(currentUser){
		if (currentUser) {
			return (<WhoAmI />)
		}
		else {
			return ( <div className="item1">

	{/*render(){
		const { currentUser } = this.props
		return (
			<div className="login-container">
			{currentUser ? <WhoAmI /> :
				<div className="container-fluid">*/}

					<Login handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
					<div className="container-fluid">
						<div className="col-md-8 marg">
							<Oauth />
						</div>
						<div className="col-md-4 marg">
							<SignUpContainer />
						</div>
					</div>
				</div> )
			}

	}

	render(){
		const { currentUser } = this.props
		return (
			<div className="login-container">
			{ this.checkUser (currentUser)}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    login(email, password) {
      return dispatch(login(email, password))
    }
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(LoginContainer)
