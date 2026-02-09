import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Apis/API_Servece";
import { errorHandler } from "../../utils/errorHandler";
import { ProductListPreview } from "../../components/ProductListPreview/ProductListPreview";
import { Loading } from "../../components/Loading/Loading";
import { Paginator } from "../../components/Paginator/Paginator";

export const ProductsCategory = () => {
    const { slug } = useParams();
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const limit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [noPages, setNoPages] = useState(0);

    function handleCurrentPage(pageNumber) {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
        async function fetchProductsPerCategory() {
        try {
            setLoading(true);
            const res = await API.get(`/products/category/${slug}`);

            setAllProducts(res.data.products);
            setNoPages(Math.ceil(res.data.products.length / limit));
            setCurrentPage(1);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoading(false);
        }
        }
        fetchProductsPerCategory();
    }, [slug]);

    useEffect(() => {
        const start = (currentPage - 1) * limit;
        const end = start + limit;
        setProducts(allProducts.slice(start, end));
    }, [currentPage, allProducts]);

    if (loading) return <Loading />;

    return (
        <div>
        <h4 className="display-6 my-3 fw-bold text-capitalize">
            {slug} Products
            <span className="text-dark">({allProducts.length})</span>
        </h4>

        <ProductListPreview products={products} />

        {noPages > 1 && (
            <Paginator
            noPages={noPages}
            onPress={handleCurrentPage}
            currentPage={currentPage}
            />
        )}
        </div>
    );
};
