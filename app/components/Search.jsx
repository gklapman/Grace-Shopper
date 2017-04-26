import React from 'react'


import {connect} from 'react-redux'


const Search = ({handleChange, handleSubmit, search}) => {

return (
  <div className="search">
    <form onSubmit={handleSubmit}>
      <div className="">
        <label className="centered-text nav-lab">Search</label>
      </div>
      <div className="">
        <input
          className="form-control"
          type="text"
          placeholder="search..."
          onChange={handleChange}
        />
      </div>
      <div className="">
        <button className="btn btn-primary">Go!</button>
      </div>
    </form>
  </div>
)
}




export default Search