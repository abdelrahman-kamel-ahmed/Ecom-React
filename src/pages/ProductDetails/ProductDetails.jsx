import React, { use } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect , useState} from 'react';
import { API } from "../../Apis/API_Servece"
import { errorHandler } from '../../utils/errorHandler';
import { Loading } from '../../components/Loading/Loading';
import { NotFound } from '../NotFound/NotFound';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

export const ProductDetails = () => {
    const {id} = useParams();
    const [product , setProduct] = useState({});
    const   [loading , setLoading] = useState (true);
    const [mainImage ,setMainImage] = useState("");

    useEffect(() => {
        async function fetchProductById() {
            try {
                setLoading(true);
                const response = await API.get(`/products/${id}`);
                const product=response.data;
                setProduct(product);
                setMainImage(product.images[0]);
            } catch (error) {
                errorHandler(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProductById();
    }, [id]);
    if(loading){
        return <Loading />;
    }
    if(!product){
        return <NotFound />;
    }
    const{images,title,category,price,rating,discountPercentage,reviews}=product;
    const filledStarsNo = Math.floor(rating);
    return (
        <div className='d-flex'>
            <div>
                <div>
                <div className="image-container">
                    <img
                    src={mainImage}
                    alt="img-preview"
                    style={{ width: "300px" }}
                    />
                </div>
                {images.length > 1 && (
                    <div className="slider-container">
                    {images.map((item) => (
                        <img
                        key={item}
                        src={item}
                        alt="img"
                        style={{ width: "100px", cursor: "pointer" }}
                        className="border"
                        onClick={() => setMainImage(item)}
                        />
                    ))}
                    </div>
                )}
                </div>

                <div></div>
            </div>
            <div className="d-flex gap-1 flex-column mx-5">
                <Link to={`/products?category=${category}`}>{category}</Link>
                <h3 className="fw-bold display-6">{title}</h3>
                <div>
                    <h6 className="mb-0">{rating}</h6>
                    <div className="d-flex gap-1">
                        {new Array(5).fill(0).map((item, index) => (
                        <div key={index}>
                            {filledStarsNo > index ? (
                            <FaStar className="text-warning" />
                            ) : (
                            <CiStar className="text-warning" />
                            )}
                        </div>
                        ))}
                    </div>
                    <a href="#reviews">{reviews.length} Ratings</a>
                </div>
                
                <div className="d-flex gap-2">
                <span className="fw-bold">
                    ${(price - (price * discountPercentage) / 100).toFixed(2)}
                </span>
                <del>${price}</del>
                <span className="text-success fw-bold">
                    {Number(discountPercentage).toFixed(1)}%
                </span>
                </div>
            </div>
        </div>
    );
}
