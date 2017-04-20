import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React from 'react';


class SingleProductContainer extends React.Component {

	render(){
	console.log('selected meme inside of single product container', this.props)
		return (
			<div className="create-account-container container"> 
				<p>{this.props.selectedMeme.name}</p>
			
			
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		memes: state.meme.memes,
		selectedMeme: state.meme.selectedMeme
	}
	
}

const mapDispatchToProps = null;



export default connect(mapStateToProps, mapDispatchToProps)(SingleProductContainer)