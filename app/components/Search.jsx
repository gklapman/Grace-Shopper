import React from 'react'


import {connect} from 'react-redux'


const Search = ({handleChange, handleSubmit, search}) => {

return (
  <div className="search">
    <form onSubmit={handleSubmit}>
      <div className="col-md-2">
        <label className="centered-text nav-lab">Search</label>
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
        <button className="btn btn-primary">Go!</button>
      </div>
    </form>
  </div>
)
}




export default Search