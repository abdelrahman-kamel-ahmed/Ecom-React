import React from 'react'
import { useEffect , useState} from "react";
import { API } from "../../Apis/API_Servece"
import { errorHandler } from '../../utils/errorHandler';

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

            console.log(response.data.products);
        } catch (error) {
            errorHandler(error);
        }
        }

        fetchProductsPerCategory();
    }, [recommendedCategory]);

    return (
        <div className='my-m'>
            <p className='display-6 mb-3'>Recommended for you</p>
        </div>
    )
};
