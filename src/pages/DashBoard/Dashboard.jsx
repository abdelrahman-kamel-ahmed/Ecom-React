import React, { useState } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { ProductsAdmin } from "../../components/ProductsAdmin/ProductsAdmin";
import { UsersAdmin } from "../../components/UsersAdmin/UsersAdmin";

export const DashBoard = () => {
    const [activeTab, setActiveTab] = useState("products");
    
    return (
        <Row className="min-vh-100">
            {/* Sidebar */}
            <Col md={3} className="bg-dark text-white p-4">
                <h4 className="fw-bold mb-4">Admin Dashboard</h4>

                <Nav className="flex-column gap-2">
                <Nav.Link
                    className={`text-white ${activeTab === "products" && "fw-bold"}`}
                    onClick={() => setActiveTab("products")}
                >
                    🛒 Products
                </Nav.Link>

                <Nav.Link onClick={() => setActiveTab("users")}
                    className={`text-white ${activeTab === "users" && "fw-bold"}`}>
                👤 Users
                </Nav.Link>
                </Nav>
            </Col>

            {/* Content */}
            <Col md={9}>
                {activeTab === "products" && <ProductsAdmin />}
                {activeTab === "users" && <UsersAdmin />}

            </Col>
        </Row>
    );
};
