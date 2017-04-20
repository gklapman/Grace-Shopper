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
			{email: '', password: ''}
		
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
		const email = this.state.email;
		const password = this.state.password;
	
		this.props.login(email, password)
	}


	render(){
		console.log("the currentUser is ", this.props.currentUser)
		const { currentUser } = this.props
		return (
			<div className="login-container navbar"> 
			{currentUser ? <WhoAmI /> : 
				<div className='navbar'> 
				
				<Login className="nav-item navbar-left" handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> 
				<Oauth className="nav-item navbar-right"/>
				<SignUpContainer className="nav-item navbar-right"/></div> }

			
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

