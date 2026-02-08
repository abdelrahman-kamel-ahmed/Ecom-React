import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartItem } from "../../components/CartItem/CartItem";
import { clearCart } from "../../store/slicies/cartSlice";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const navigate = useNavigate();
  function handleCheckout() {
    if(!isLoggedIn){
      
      navigate("/login");
      return;
    }
    dispatch(clearCart());
  }
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="text-center vh-100 d-flex flex-column justify-content-center">
        <h2>Your cart is empty 🛒</h2>
        <Button as={Link} to="/Products" className="mt-3 btn-dark">
          Start Shopping
        </Button>
      </div>
    );
  }
  return (
    <Row className="mt-4">
      {/* Cart Items */}
      <Col md={8}>
        <h4 className="mb-3">Shopping Cart</h4>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </Col>
      {/* Summary */}
      <Col md={4}>
        <Card className="shadow-lg border-0">
          <Card.Body>
            <h5 className="fw-bold mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Total</span>
              <span className="fw-bold text-success">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <hr />
            <Button variant="dark" className="w-100 mb-2" onClick={handleCheckout}>
              Checkout 💳
            </Button>
            <Button
              variant="outline-danger"
              className="w-100"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
