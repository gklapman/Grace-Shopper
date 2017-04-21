import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React from 'react';
import SignUp from '../components/Signup'
import {signup} from 'APP/app/reducers/auth'

class SignUpContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			address: '',
			name: '',
			showSignUp: false,
			
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.switchSignUp = this.switchSignUp.bind(this)
	}

	handleSubmit(event){
		event.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		const address = this.state.address;
		const name = this.state.name;
		if (!email || !password){
			alert('Please fill out email and password')
		} else {
		this.props.signup(email, password, address, name)
		}

	}

	handleChange(event){
		const name = event.target.name
		const value = event.target.value
		this.setState({
			[name]: value
		})
	}

	switchSignUp(){
		this.setState({
			showSignUp: true,
		});
	}

	render(){
	
		return (
			<div className="create-account-container"> 
			<button className="btn btn-default" onClick={this.switchSignUp}>SignUp</button>
			{this.state.showSignUp ? <SignUp handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> : null}
			
			
			</div>
		)
	}
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
	return {
		signup(email, password, address, name){
			return dispatch(signup(email, password, address, name))
		}
		
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)