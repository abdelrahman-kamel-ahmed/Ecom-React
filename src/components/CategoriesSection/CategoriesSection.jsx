import React, { useEffect, useState } from "react";
import { API } from "../../Apis/API_Servece";
import { errorHandler } from "../../utils/errorHandler";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
        try {
            const res = await API.get("/products/categories");
            setCategories(res.data);
        } catch (error) {
            errorHandler(error);
        }
        }
        fetchCategories();
    }, []);

    return (
        <div className="my-5">
        <h2 className="fw-bold mb-4 text-center">
            🛍 Browse Categories
        </h2>
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 4 },
            }}
            className="pb-5"
        >
            {categories.map((category, index) => (
            <SwiperSlide key={index}>
                <Link
                to={`/category/${category.slug}`}
                className="text-decoration-none"
                >
                <div
                    className="text-center p-4 shadow-lg h-100"
                    style={{
                    background: "linear-gradient(135deg, #1f1f2e, #2c2c54)",
                    borderRadius: "20px",
                    color: "#fff",
                    transition: "0.3s ease",
                    }}
                >
                    <img
                    src={`https://picsum.photos/300?random=${index}`}
                    alt={category}
                    className="rounded-circle mb-3 border border-3 border-white"
                    style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                    }}
                    />

                    <h5 className="fw-bold text-capitalize">
                    {category.name}
                    </h5>
                </div>
                </Link>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
    };
