import React from 'react'
import { Card } from 'react-bootstrap'
import { AddToCartButton } from '../addToCartButton/addToCartButton';
import { Link } from 'react-router-dom';


//take props -> Product
//take props -> with footer true/false
export const ProductCard = ({product ,withFooter=false}) => {
    const { title , thumbnail , description ,price,id} = product;
    return (
        <Card className="h-100 d-flex flex-column">
            <Card.Img variant="top" src={thumbnail} />
            <Card.Body className="flex-grow-1">
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className='text-warning'>${price}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            {withFooter && <Card.Footer className='d-flex justify-content-between align-items-center'>
                <AddToCartButton />
                <Link to={`/product-datails/${id}`} className='btn btn-dark ms-2'>View Details</Link>  
            </Card.Footer>}
        </Card>
    )
}