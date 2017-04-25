import React, { Component } from 'react'


export default props => {
  console.log(props);

  return (
    <div>
      <table style={{width:'1000px'}}>
        <tr>
          <th></th>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          {/*<th>Photo</th>*/}
          <th>Product_info</th>
          <th>Stock</th>
        </tr>

          { props.props.map((meme) => { return (
          <tr key={meme.id}>
            <td><button value={meme.id} onClick={props.editRow} href="">edit</button></td>
            <td>{meme.id}</td>
            <td>{meme.name}</td>
            <td>{meme.price}</td>
            {/*<td>{meme.photo}</td>*/}
            <td>{meme.product_info}</td>
            <td>{meme.stock}</td>
          </tr>

          )
          }) }

      </table>
      {props.showForm ?
       <div className="login form-inline col-md-7">
        <form onSubmit={props.handleSubmit}>
          <div className="form-group">
            <label>name</label>
            <input
              value = { props.formState.name}
              onChange ={props.handleChange}
              name="name"
              className="form-control"
            />
            <br/>
           <label>price</label>
           <input
              style={{display:'float-right'}}
              value = { props.formState.price}
              onChange ={props.handleChange}
              name="price"
              className="form-control"
            />
            <br/>
            <label>Product Info</label>
           <textArea
              value = { props.formState.product}
              onChange ={props.handleChange}
              name="product"
              className="form-control"
            />
            <br/>
            <input
              value = { props.formState.stock}
              onChange ={props.handleChange}
              name="stock"
              className="form-control"
            />
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
       : null }

    </div>
  )
}
