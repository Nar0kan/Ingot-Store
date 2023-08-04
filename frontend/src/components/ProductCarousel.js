import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'


function ProductCarousel() {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loader/>
        : error ? <Message variant='danger'>error</Message>
        : (
            <Carousel variant='dark' data-bs-theme="dark" pause='hover'>
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image
                                style={{
                                        width: 'auto',
                                        display: 'block',
                                        margin: '0 auto',
                                        'padding-bottom': '90px',
                                        'max-height': '500px',
                                        'min-height': '500px',
                                    }}
                                src={product.image}
                                alt={product.name}
                                fluid>
                                
                            </Image>
                            <Carousel.Caption className='carousel.caption text-dark bg-transparent'>
                                <h4>{product.name} (${product.price})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel
