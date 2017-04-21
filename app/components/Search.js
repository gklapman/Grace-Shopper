import React from 'react'


import {connect} from 'react-redux'


const Search = ({handleChange, handleSubmit, search}) => {
	console.log('search', search)

return (
  <div className="search">
    <form onSubmit={handleSubmit}>
      <div className="col-md-2">
        <label className="centered-text">Search</label>
      </div>
      <div className="col-md-8">
        <input
          className="form-control"
          type="text"
          placeholder="search..."
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-default">Go!</button>
      </div>
    </form>
  </div>
)
}




export default Search