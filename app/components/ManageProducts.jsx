import React, { Component } from 'react'


export default props => {
  return (
    <div>
      <table style={{width: '1000px'}}>
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
            <td><button value={meme.id} onClick={props.addTag} href="">Tag</button></td>
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
        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <label>name</label>
            <input
              value = { props.formState.name}
              onChange ={props.onChange}
              name="name"
              className="form-control"
            />
            <br/>
           <label>price</label>
           <input
              value = { props.formState.price}
              onChange ={props.onChange}
              name="price"
              className="form-control"
            />
            <br/>
            <label>Product Info</label>
           <textArea
              value = { props.formState.product}
              onChange ={props.onChange}
              name="product"
              className="form-control"
            />
            <br/>
            <label>Quanity</label>
            <input
              value = { props.formState.stock}
              onChange ={props.onChange}
              name="stock"
              className="form-control"
            />
            <br/>
             <label>photo url</label>
               <input
              value = { props.formState.photo}
              onChange ={props.onChange}
              name="stock"
              className="form-control"
              style={{width: '300px'}}
            />
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
       : null }
       {props.formState.showOtherForm ?
       <div className="login form-inline col-md-7">
        <form onSubmit={props.handleTagSub}>
          <label>Tag</label>
          <input value={props.formState.tag} onChange={props.handleTag} className="form-control"/>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
       : null}

    </div>
  )
}
