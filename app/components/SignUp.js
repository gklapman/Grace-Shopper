import React from 'react';

const SignUp = (props) => (
	<div className="create-account">
		<form onSubmit={props.handleSubmit}>
			<div className="form-group">
				<label>Email</label>
				<input 
					onChange={props.handleChange}
					name="email"
					type="email"
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label>Password</label>
				<input 
					onChange={props.handleChange}
					name="password"
					type="password"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Name</label>
				<input 
					onChange={props.handleChange}
					name="name"
					type="text"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Address</label>
				<input 
					onChange={props.handleChange}
					name="address"
					type="text"
					className="form-control"
				/>
			</div>
			
		
			<button className="btn btn-block btn-primary" type="submit">Create Account</button>
		</form>
		
	</div>
)

export default SignUp;