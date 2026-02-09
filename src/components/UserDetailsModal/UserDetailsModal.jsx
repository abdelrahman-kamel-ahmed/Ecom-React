import React from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";

export const UserDetailsModal = ({ show, onHide, user }) => {
    if (!user) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Row>
            <Col md={4} className="text-center">
                <Image src={user.image} roundedCircle width={120} />
                <h5 className="mt-3">
                {user.firstName} {user.lastName}
                </h5>
                <p className="text-muted">@{user.username}</p>
            </Col>

            <Col md={8}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Role:</strong> {user.role}</p>

                <hr />

                <p><strong>City:</strong> {user.address?.city}</p>
                <p><strong>University:</strong> {user.university}</p>

                <hr />

                <p><strong>Card:</strong> {user.bank?.cardNumber}</p>
                <p><strong>Crypto:</strong> {user.crypto?.coin}</p>
            </Col>
            </Row>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    );
};
