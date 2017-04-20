import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React from 'react';
import Search from './Search'






class SearchContainer extends React.Component {
    constructor(props) {
		super(props);
		this.state =  
			{search: ''}
		
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
		const search = this.state.search;
		console.log(search)
	}


	render(){
		const { currentUser } = this.props
		return (
			<div className="search-container"> 
			<Search handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
			</div>
		)
	}
}




const mapStateToProps = (state, ownProps) => {
	return {
		memes: state.memes.products
	}
	
}

const MapDispatchToProps = null


export default connect(mapStateToProps, MapDispatchToProps)(SearchContainer);