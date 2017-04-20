import React from 'react'


import {connect} from 'react-redux'


const Search = ({handleChange, handleSubmit, search}) => {
	console.log('search', search)

return (
  <div className="search">
    <form onSubmit={handleSubmit}>
    <div className="form-group row">
          <div className="col-md-6 col-xs-12">
            <label className="col-xs-2 control-label">Search Memes</label>
            <input
              className="form-control"
              type="text"
              placeholder="search..."
              onChange={handleChange}
            />
          </div>
          </div>
          <button className="btn btn-default">Go!</button>
      </form>
  </div>
)
}




export default Search