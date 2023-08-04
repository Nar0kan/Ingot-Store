import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen() {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo.is_admin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }


    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='d-flex justify-content-md-end'>
                    <Button className='my-3 py-2' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
            ? (
                <Loader/>
            )
            : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm bg-transparent border-0'>
                                            <i className='fas fa-edit' style={{color:'blue', background: 'transparent'}}></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm bg-transparent border-0'>
                                        <i className='fas fa-trash' style={{color:'red', background: 'transparent'}} onClick={() => deleteHandler(product._id)}></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
                </div>
            )}
        </div>
    )
}

export default ProductListScreen
