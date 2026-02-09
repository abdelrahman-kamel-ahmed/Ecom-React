import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { ProductCard } from '../productCard/productCard'


export const ProductListPreview = ({ products, onDelete, onEdit ,isPublic}) => {
    return (
        <div className="row g-3">
        {products.map(product => (
            <div key={product.id} className="col-md-4">
            <div className="position-relative">
                <ProductCard 
                product={product} 
                withFooter={true} 
                onDelete={onDelete}  
                onEdit={onEdit} 
                isPublic={isPublic}
                

            />

            </div>
            </div>
        ))}
        </div>
    );
};

