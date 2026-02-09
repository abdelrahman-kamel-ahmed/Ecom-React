import React, { useState } from "react";
import { Card, Button, Row, Col, Image, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IMAGES } from "../../constants/images";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa"; // dashboard icon
import { Loading } from "../../components/Loading/Loading";
export const Profile = () => {
  const { user, isAdmin } = useSelector(state => state.user);
  const [showCardInfo, setShowCardInfo] = useState(false);

  if (!user) return <Loading />; 

  // Placeholder stats for now
  const phone = user.phone || "1234567890";
  const city = user.address?.city || "Canada";
  const role = user.role || "User";
  const gender = user.gender || "N/A";
  const cardnum = user.bank?.cardNumber|| "1234 5678 9012 3456";
  const cardexpiry = user.bank?.cardExpire|| "MM/YY";
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
            backgroundColor: "#000000", 
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
              className="border border-3 border-danger shadow-lg"
              alt="User Avatar"
            />
          </div>

          <Card.Body className="text-center">
            {/* Name */}
            <Card.Title className="fs-2 fw-bold text-light mb-2">{user.firstName} {user.lastName}</Card.Title>
            <Card.Subtitle className="text-info mb-3">@{user.username}</Card.Subtitle>

            {/* Contact info */}
            <p className="text-light mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="text-light mb-1"><strong>Phone:</strong> {phone}</p>
            <p className="text-light mb-3"><strong>City:</strong> {city}</p>

            {/* Stats badges */}
            <div className="mb-4">
              <Badge 
                pill 
                bg="light" 
                className="me-2 p-2 fs-6 shadow text-dark"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowCardInfo(!showCardInfo)}
              >
                {showCardInfo ? `Card Info: ${cardnum} ${cardexpiry}` : "Show Card Info"}
              </Badge>

              <Badge pill bg="light" className="me-2 p-2 fs-6 shadow text-dark">
                Gender: { gender }
              </Badge>

              <Badge pill bg="light" className="p-2 fs-6 shadow text-dark">
                Role: { role }
              </Badge>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3">
              <Button 
                variant="outline-light" 
                className="fw-bold shadow-sm" 
                onClick={handleEditProfile}
              >
                Edit Profile ✏️
              </Button>
              <Button 
                variant="outline-light" 
                className="fw-bold shadow-sm" 
                onClick={handleChangePassword}
              >
                Change Password 🔒
              </Button>
              {
                isAdmin && (
                  <Button
                    as={Link}
                    to="/dashboard"
                    variant="outline-danger" 
                    className={'d-flex align-items-center gap-2 fw-bold shadow-sm text-light'}
                  >
                    Admin Dashboard <FaTachometerAlt />
                  </Button> 
                )
              }
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
