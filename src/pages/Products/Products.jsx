import React from 'react'
import { useState } from 'react'
import { ProductListPreview } from '../../components/ProductListPreview/ProductListPreview';
import { useEffect } from 'react';
import { API } from '../../Apis/API_Servece';
import { errorHandler } from '../../utils/errorHandler';
import { Paginator } from '../../components/paginator/paginator';
import { Loading } from '../../components/Loading/Loading';

export const Products = () => {
    const [products , setProducts] = useState([]);
    const [noPages , setNoPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [skip , setSkip] = useState(0);
    const [loading , setLoading] = useState(true);
    const limit =20;
    function handleCurrentPage(pageNumber){
        setCurrentPage(pageNumber);
        setSkip((pageNumber-1)*limit);
    }
    useEffect(function(){
    async function fetchAllProducts() {
        try {
        setLoading(true);
        // Hit Endpoint
        const response = await API.get(`/products?skip=${skip}&limit=${limit}`);

        // Extract Data
        const { products , total } = response.data;
        // Update State
        setProducts(products);
        setNoPages(Math.ceil(total/limit));
        } catch (error) {
        errorHandler(error);
        }
        finally {
            setLoading(false);
        }
    }
    fetchAllProducts();
    },[skip]);
    if(loading){
        return <Loading />;
    }
    return (
        <div>
            <h4 className='display-6 my-3'>All Products</h4>
            <ProductListPreview products={products} />
            <Paginator noPages={noPages} onPress={handleCurrentPage} currentPage={currentPage} />
        </div>
    )
}
