import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="col-md-2">
        <Link to="/">
          <div className="store center">
            <span className="green">memes</span><span className="red">R</span><span className="blue">us</span>
          </div>
        </Link>
        <div className="sidebar center">
          <h3>Categories</h3>
            {this.props.tags.map(tag => {
              return (
                <div key={tag.id}>
                  <Link to={`/products/categories/${tag.id}`}>{tag.tag}</Link>
                </div>
              )
            })}
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