import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React from 'react';
import Search from '../components/Search.jsx'
import {oneMeme} from '../reducers/meme'




class SearchContainer extends React.Component {
    constructor(props) {
		super(props);
		this.state =  
			{search: ''}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event){
		this.setState({
			search: event.target.value
		})
	}



	handleSubmit(event){
		event.preventDefault();
		const searcheditem = this.state.search;
		let correctMeme;
		this.props.memes.forEach(meme => {
			if (meme.name === searcheditem){
				correctMeme = meme
			}
		})
		if (!correctMeme){
			alert(`Sorry, we don't have that meme in stock`)
			browserHistory.push(`/products`)
			this.setState({
				search: '',
			})
		}
		else {
			this.props.oneMeme(correctMeme)
			let productId = correctMeme.id
			browserHistory.push(`/products/${productId}`)
		}

	}



	render(){
		const { memes } = this.props
	
		return (
			<div className="search-container"> 
			<Search handleChange={this.handleChange} handleSubmit={this.handleSubmit} search={this.state.search}/>
			</div>
		)
	}
}




const mapStateToProps = (state, ownProps) => {
	return {
		memes: state.meme.memes
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		oneMeme(meme){
			return dispatch(oneMeme(meme))
		}
		
	}
}




export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);