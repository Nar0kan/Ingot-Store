import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'


function Product({ product }) {
  return (
    <div>
      <Card
        className="my-3 p-3 rounded"
        style={{
          'min-height': '680px',
          'width': 'auto',
        }}
        >
        <Link to={`/product/${product._id}`}>
            <Card.Img
            style={{
              'min-height': '250px',
              'max-height': '300px',
              'max-width': '250px',
              'width': 'auto',
              'margin': '0 auto',
            }}
          src={product.image} />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <h3><strong className="fs-5">{product.name}</strong></h3>
                </Card.Title>
            </Link>

            <Card.Text as="div" className="d-block my-3 mx-auto">
                <div>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                </div>
            </Card.Text>

            <Card.Text as="h3" className='mx-auto'>
                <p className="fs-3">${product.price}</p>
            </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product

