import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Nav, Button, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="light" expand="lg" className="bg-body-tertiary" collapseOnSelect>
                <Container fluid>

                    <LinkContainer to="/">
                        <Navbar.Brand>IngotStore</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 mr-auto"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                            </LinkContainer>
                        )}

                        {userInfo && userInfo.is_admin && (
                            <NavDropdown title='Admin' id='username'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) }

                    </Nav>
                    <SearchBox />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
