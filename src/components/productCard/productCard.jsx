import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { AddToCartButton } from '../addToCartButton/addToCartButton'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API } from '../../Apis/API_Servece'
import toast from 'react-hot-toast'
import { errorHandler } from '../../utils/errorHandler'





export const ProductCard = ({ product, withFooter = false ,onDelete ,onEdit ,isPublic}) => {
    const { title, thumbnail, description, price, id } = product
    const { isAdmin } = useSelector(state => state.user)

    


    return (
        <Card className="h-100 d-flex flex-column shadow-sm border-1">
        <Card.Img src={thumbnail} />
        
        <Card.Body className="flex-grow-1">
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="text-success fw-bold">${price}</Card.Subtitle>
            <Card.Text className="text-muted small">{description}</Card.Text>
        </Card.Body>

        {withFooter && (
        <Card.Footer className="d-flex flex-column gap-2" style={{
            background: "#030329 ",
        }}>

            {/* ROW 1 – always visible */}
            <div className="d-flex gap-2 justify-content-between">
            <AddToCartButton product={product} />
            <Button 
                as={Link}
                to={`/product-details/${id}`}
                variant='outline-light'
            >
                View Details
            </Button>
            </div>
            {/* ROW 2 – admin only */}
            {isAdmin && !isPublic && (
            <div className="d-flex gap-2 justify-content-between">
                <Button
                onClick={() => onEdit(product)}
                className="fw-bold w-100"
                variant='outline-warning'
                >
                Edit
                </Button>

                <Button
                onClick={() => onDelete(id)}
                className="fw-bold w-100"
                variant='outline-danger'
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
