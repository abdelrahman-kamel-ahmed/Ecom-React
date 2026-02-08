import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../../store/slicies/cartSlice";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body className="d-flex align-items-center justify-content-between">
        
        {/* Product Image */}
        <div className="d-flex align-items-center gap-3">
          <Image src={item.thumbnail} width={80} rounded />
          <div>
            <h6 className="fw-bold">{item.title}</h6>
            <p className="text-warning fw-bold mb-1">${item.price}</p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => dispatch(decreaseQty(item.id))}
          >
            <FaMinus />
          </Button>

          <span className="fw-bold">{item.quantity}</span>

          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => dispatch(increaseQty(item.id))}
          >
            <FaPlus />
          </Button>
        </div>

        {/* Total Price */}
        <div className="fw-bold text-success">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        {/* Remove */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          <FaTrash />
        </Button>

      </Card.Body>
    </Card>
  );
};
