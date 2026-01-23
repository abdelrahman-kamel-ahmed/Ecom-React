import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { ProductCard } from '../productCard/productCard'

export const ProductListPreview = ({products=[]}) => {
    return (
        <>
            <Row className='g-3 my-4 '>
                {products.map(product => (
                <Col key={product.id} className="mb-3" md={6} sm={12} lg={4}>
                    <ProductCard product={product} withFooter={true}/>
                </Col>
            ))}
            </Row>
            {products.length == 0 && <p className='text-center display-6 text-secondary'>No Products Found</p>}
        
        </>
    )
}
