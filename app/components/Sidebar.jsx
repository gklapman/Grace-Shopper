import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar col-md-2">
        <div className="categories">
          <h4>Categories</h4>
          <ul>
            {this.props.tags.map(tag => {
              return (
                <li key={tag.id}>
                  <Link to={`/products/categories/${tag.id}`}>{tag.tag}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {tags: state.bars.tags}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)