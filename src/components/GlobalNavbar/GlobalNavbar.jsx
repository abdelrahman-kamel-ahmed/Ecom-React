import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { SiWoocommerce } from "react-icons/si";
import { Link } from 'react-router-dom';
export const GlobalNavbar = () => {
  return (
    <Navbar expand="md" className='bg-light data-bs-theme="light"'>
      <Container>
        {/* barnd with logo */}
        <Navbar.Brand as={Link} to={'/'}>
          <SiWoocommerce className='display-1 text-primary'/>
        </Navbar.Brand>
        {/* toggle button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* navbar links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
