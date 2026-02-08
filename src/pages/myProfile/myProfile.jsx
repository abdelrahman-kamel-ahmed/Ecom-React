import React, { useState } from "react";
import { Card, Button, Row, Col, Image, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IMAGES } from "../../constants/images";
import { toast } from "react-hot-toast";

export const Profile = () => {
  const { user } = useSelector(state => state.user);
  const [showCardInfo, setShowCardInfo] = useState(false); // toggle state

  if (!user) return <p>Loading user...</p>;

  // Placeholder stats for now
  const orders = "…";     // will fetch later
  const wishlist = "…";   // will fetch later
  const cartItems = "…";  // will fetch later
  const phone = user.phone || "+20 123 456 789";
  const city = user.address?.city || "Cairo, Egypt";
  const role = user.role || "Customer";
  const gender = user.gender || "N/A";
  const cardnum = user.bank?.cardNumber || "**** **** **** ****";
  const cardexpiry = user.bank?.cardExpire || "**/**";
  console.log(user);

  const handleEditProfile = () => {
    toast.success("Edit profile coming soon! 🎉", {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontWeight: 'bold',
      },
      icon: '✏️'
    });
  };

  const handleChangePassword = () => {
    toast.success("Change password feature coming soon! 🔒", {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontWeight: 'bold',
      },
      icon: '🔑'
    });
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={10} lg={8}>
        <Card 
          className="p-4 shadow-lg" 
          style={{ 
            backgroundColor: "#1f1f2e", 
            borderRadius: "20px",
            color: "#fff"
          }}
        >
          <div className="text-center mb-4">
            {/* Avatar */}
            <Image
              src={IMAGES.AVATAR}
              roundedCircle
              width={130}
              height={130}
              className="border border-3 border-primary shadow-lg"
              alt="User Avatar"
            />
          </div>

          <Card.Body className="text-center">
            {/* Name */}
            <Card.Title className="fs-2 fw-bold text-warning mb-2">{user.firstName} {user.lastName}</Card.Title>
            <Card.Subtitle className="text-info mb-3">@{user.username}</Card.Subtitle>

            {/* Contact info */}
            <p className="text-light mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="text-light mb-1"><strong>Phone:</strong> {phone}</p>
            <p className="text-light mb-3"><strong>City:</strong> {city}</p>

            {/* Stats badges */}
            <div className="mb-4">
              <Badge 
                pill 
                bg="success" 
                className="me-2 p-2 fs-6 shadow"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowCardInfo(!showCardInfo)} // toggle
              >
                {showCardInfo ? `Card Info: ${cardnum} ${cardexpiry}` : "Show Card Info"}
              </Badge>

              <Badge pill bg="danger" className="me-2 p-2 fs-6 shadow">
                Gender: { gender }
              </Badge>

              <Badge pill bg="primary" className="p-2 fs-6 shadow">
                Role: { role }
              </Badge>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3">
              <Button 
                variant="outline-warning" 
                className="fw-bold shadow-sm" 
                onClick={handleEditProfile}
              >
                Edit Profile ✏️
              </Button>
              <Button 
                variant="outline-info" 
                className="fw-bold shadow-sm" 
                onClick={handleChangePassword}
              >
                Change Password 🔒
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
