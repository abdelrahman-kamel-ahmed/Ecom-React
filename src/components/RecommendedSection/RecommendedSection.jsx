import React from 'react'
import { useEffect , useState} from "react";
import { API } from "../../Apis/API_Servece"
import { errorHandler } from '../../utils/errorHandler';
import { ProductListPreview } from '../ProductListPreview/ProductListPreview';

export const RecommendedSection = () => {
  // Get Category
    const recommendedCategory = localStorage.getItem("recommended-category") ?? "beauty";
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        // 1. MOUNT
        // 2. recommendedCategory UPDATE
        async function fetchProductsPerCategory() {
        try {
            const response = await API.get(
            `/products/category/${recommendedCategory}`
            );

            setProducts(response.data.products);
        } catch (error) {
            errorHandler(error);
        }
        }

        fetchProductsPerCategory();
    }, [recommendedCategory]);

    return (
        <div className='my-m'>
            <h4 className='display-6 my-3 fw-bold'>Recommended for you</h4>
            <ProductListPreview products={products} isPublic={true}/>
        </div>
    )
};
