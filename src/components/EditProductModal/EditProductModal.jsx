import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API } from "../../Apis/API_Servece";
import { toast } from "react-hot-toast";
import { errorHandler } from "../../utils/errorHandler";

export const EditProductModal = ({ show, onHide, product, onUpdate }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        thumbnail: "",
    });
    const [loading, setLoading] = useState(false);

    // Pre-fill form when modal opens or product changes
    useEffect(() => {
        if (product) {
        setForm({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            thumbnail: product.thumbnail,
        });
        }
    }, [product]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
        setLoading(true);

        // 1 Call API (will simulate update)
        const response = await API.put(`/products/${product.id}`, {
            ...form,
            price: Number(form.price),
        }, {
            headers: { "Content-Type": "application/json" },
        });

        const updatedProduct = response.data;
        console.log("Updated product:", updatedProduct);

        // 2️ Update parent state & localStorage
        onUpdate(updatedProduct);

        toast.success("Product updated!");
        onHide(); // close modal
        } catch (err) {
        errorHandler(err);
        } finally {
        setLoading(false);
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
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
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="warning" type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
            </Button>
            </Modal.Footer>
        </Form>
        </Modal>
    );
};
