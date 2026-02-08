import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { API } from "../../Apis/API_Servece";
import { errorHandler } from "../../utils/errorHandler";
import { ProductListPreview } from "../../components/ProductListPreview/ProductListPreview";
import toast from "react-hot-toast";
import { AddProductModal } from "../AddProductsModal/AddProductModal";

export const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Fetch products from localStorage or API
    async function fetchProducts() {
        try {
        setLoading(true);

        const savedProducts = localStorage.getItem("products");
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            const res = await API.get("/products?limit=100");
            setProducts(res.data.products);
            // Save initial fetch to localStorage
            localStorage.setItem("products", JSON.stringify(res.data.products));
        }
        } catch (err) {
        errorHandler(err);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    // ADD PRODUCT
    function handleAdd(newProduct) {
        setProducts(prev => {
            const updated = [newProduct, ...prev];
            localStorage.setItem("products", JSON.stringify(updated));
            return updated;
        });
        toast.success("Product added!");
    }


    // DELETE PRODUCT
    async function handleDelete(id) {
    try {
        // 1 Update React state and localStorage
        setProducts(prev => {
        const updated = prev.filter(p => p.id !== id);
        localStorage.setItem("products", JSON.stringify(updated));
        return updated;
        });

        toast.success("Product deleted successfully!");
    } catch (err) {
        errorHandler(err);
    }
    }


    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Products Management</h3>
            <Button variant="success" onClick={() => setShowModal(true)}>
            ➕ Add Product
            </Button>
            <AddProductModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onAdd={handleAdd} // Pass the handler
            />
        </div>

        {!loading && (
            <ProductListPreview
            products={products}
            isAdmin
            onDelete={handleDelete}
            />
        )}
        </>
    );
};
