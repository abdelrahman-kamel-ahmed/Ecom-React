import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

export const Loading = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
            <Spinner animation="border" role="status"></Spinner>
        </Container>
  )
}
