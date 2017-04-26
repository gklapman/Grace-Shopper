
import React from 'react'
import { Link } from 'react-router'

const reviewCreator = (props) => {

  return (
    <div style={{border: '2px solid black', margin: '0 0 100px 0'}}>
      <form onSubmit = {props.handleSubmit}>
        <label className="labelform" style={{display: 'block', margin:'20px'}} type="text" htmlFor="title">Write tile here for meme review.</label>
        <input name='title' style={{width: '300px', display:'block', margin:'20px'}} type="text" value={props.title} onChange={props.handleChange} id="title" placeholder="title"></input>
        <label htmlFor="content" style={{display: 'block', margin:'20px'}}  >Write review here for meme.</label>

        <textarea name='content' value={props.content} onChange={props.handleChange} style={{display: 'block',  margin:'20px', width: '400px'}} id="content"  rows="7"></textarea>

          <select value={props.value} onChange={props.handleChange} className="ratingControl" name='stars' id="exampleSelect1" style={{ margin:'20px'}}>
            <option selected disabled hidden style={{display: 'none'}} value=''></option>
            <option value ='1' >★</option>
            <option value ='2' >★★</option>
            <option value ='3' >★★★</option>
            <option value ='4' >★★★★</option>
            <option value ='5' >★★★★★</option>
          </select>
          <button className="btn btn-product" type="submit" value="Submit">Submit</button>
      </form>
    </div>
  )
}

export default reviewCreator




