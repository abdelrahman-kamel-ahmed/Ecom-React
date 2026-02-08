import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { AddToCartButton } from '../addToCartButton/addToCartButton'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API } from '../../Apis/API_Servece'
import toast from 'react-hot-toast'
import { errorHandler } from '../../utils/errorHandler'

export const ProductCard = ({ product, withFooter = false ,onDelete}) => {
    const { title, thumbnail, description, price, id } = product
    const { isAdmin } = useSelector(state => state.user)

    function handleDelete() {
        onDelete(id);
    }

    return (
        <Card className="h-100 d-flex flex-column shadow-sm">
        <Card.Img variant="top" src={thumbnail} />
        
        <Card.Body className="flex-grow-1">
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="text-warning fw-bold">${price}</Card.Subtitle>
            <Card.Text className="text-muted small">{description}</Card.Text>
        </Card.Body>

        {withFooter && (
        <Card.Footer className="d-flex flex-column gap-2">

            {/* ROW 1 – always visible */}
            <div className="d-flex gap-2 justify-content-between">
            <AddToCartButton product={product} />
            <Button 
                as={Link}
                to={`/product-details/${id}`}
                className="btn btn-dark fw-bold">
                View Details
            </Button>
            </div>
            {/* ROW 2 – admin only */}
            {isAdmin && (
            <div className="d-flex gap-2 justify-content-between">
                <Button
                as={Link}
                to={`/dashboard/edit-product/${id}`}
                className="btn btn-warning fw-bold w-100"
                >
                Edit
                </Button>

                <Button
                onClick={handleDelete}
                className="btn btn-danger  fw-bold w-100"
                >
                Delete
                </Button>
            </div>
            )}
        </Card.Footer>
        )}
        </Card>
    )
}
