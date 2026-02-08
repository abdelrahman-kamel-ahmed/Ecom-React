import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API } from "../../Apis/API_Servece";
import { toast } from "react-hot-toast";
import { errorHandler } from "../../utils/errorHandler";

export const AddProductModal = ({ show, onHide, onAdd }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        thumbnail: "",
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await API.post("/products/add", {
                title: form.title,
                description: form.description,
                price: Number(form.price),
                category: form.category,
                thumbnail: form.thumbnail,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
            const newProduct = response.data;

            // Call the parent callback
            onAdd(newProduct);
            onHide(); // close modal
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Modal show ={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
            <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                name="description"
                value={form.description}
                onChange={handleChange}
                as="textarea"
                rows={3}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Thumbnail URL</Form.Label>
                <Form.Control
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                />
            </Form.Group>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button variant="success" type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
            </Button>
            </Modal.Footer>
        </Form>
        </Modal>
    );
};
