import {Link} from 'react-router'

export default (props) => {
    // expect to receive: array of products (which have a name, image, description, price, average rating)
    const shorten = (text) => {
        if (text.length < 32) {
            return text
        } else {
            return text.slice(0, 32) + '...'
        }
    }
    // todo: create function for displaying ratings as stars
    // todo: refactor styling to css
    return (
        <div>
            <ul>
                {props.products.map(product => {
                    return (
                        <li>
                            <h4>{product.name}</h4>
                            <div>{shorten(product.description)}</div>
                            <div>{produce.price} {product.rating}</div>
                            <img style="float: right" src={product.image} alt={product.name}></img>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}