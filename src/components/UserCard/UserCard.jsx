import React from "react";
import { Card, Button, Col, Badge } from "react-bootstrap";


export const UserCard = ({ user, onView }) => {
    return (
        <Col md={4}>
        <Card className="h-100 shadow-sm">
            <Card.Img
            variant="top"
            src={user.image}
            style={{ height: 180, objectFit: "cover" }}
            />

            <Card.Body>
            <Card.Title>
                {user.firstName} {user.lastName}
            </Card.Title>

            <Card.Text className="text-muted">
                @{user.username}
            </Card.Text>

            <Badge bg={user.role === "admin" ? "danger" : "primary"}>
                {user.role}
            </Badge>
            </Card.Body>

            <Card.Footer>
            <Button variant="dark" className="w-100" onClick={onView}>
                View Details
            </Button>
            </Card.Footer>
        </Card>
        </Col>
    );
};
