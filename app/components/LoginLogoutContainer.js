import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React from 'react';
import Login from './Login'
import WhoAmI from './WhoAmI'
import Oauth from './Oauth'
import SignUpContainer from './SignUpContainer'

import {login} from 'APP/app/reducers/auth'



class LoginContainer extends React.Component {
    constructor(props) {
		super(props);
		this.state =  
			{name: '', password: ''}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event){
		let name = event.target.name
		this.setState({
			[name]: event.target.value
		})
	}



	handleSubmit(event){
		event.preventDefault();
		const email = this.state.formEmail;
		const password = this.state.formPassword;
		this.props.login(email, password)
	}


	render(){
		const { currentUser } = this.props
		return (
			<div className="login-container"> 
			{currentUser ? <WhoAmI /> : <div> <Login handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> <Oauth /> <SignUpContainer /></div> }
			
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
		login(email, password){
			return dispatch(login(email, password))
		}
	}
}


export default connect(mapStateToProps, MapDispatchToProps)(LoginContainer);

