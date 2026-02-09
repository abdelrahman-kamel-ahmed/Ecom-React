import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addTocart } from '../../store/slicies/cartSlice';

export const AddToCartButton = ({product}) => {
  const isDisapled=product.stock==0
  const dispatch = useDispatch();
  function handleAddToCart() {
    dispatch(addTocart(product));
  }
  return (
    <Button variant="outline-light" className=''  onClick={handleAddToCart} disabled={isDisapled} style={{cursor:isDisapled?"not-allowed":"pointer",pointerEvents:"unset"}}>Add to Cart</Button>
  )
}
