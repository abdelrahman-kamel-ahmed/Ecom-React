import React from 'react'
import { Container, Navbar, Nav, Button }from 'react-bootstrap'
import { SiWoocommerce } from "react-icons/si";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogOutButton } from '../LogOutButton/LogOutButton';
import { Avatar } from '../Avatar/Avatar';
export const GlobalNavbar = () => {
  
  //select isloggedin
  const {IsLoggedIn} = useSelector(state=>state.user);
  return (
    <Navbar expand="md" bg="dark" variant="dark">
      <Container>
        {/* barnd with logo */}
        <Navbar.Brand as={Link} to={'/'}>
          <SiWoocommerce className='display-1 text-primary'/>
        </Navbar.Brand>
        {/* toggle button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav variant-light"/>
        {/* navbar links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={'/Products'}>Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={'/cart'}>Cart</Nav.Link>
            </Nav.Item>
            
          </Nav>
          {
              IsLoggedIn?(
                <>
                <Avatar/>
                <LogOutButton/>
                </>
              ):
              (
                <>
                <Button as={Link} to={'/login'}>Login</Button>
                </>
              )
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
