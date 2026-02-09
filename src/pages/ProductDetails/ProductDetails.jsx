import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, Image, Badge } from "react-bootstrap";
import { API } from "../../Apis/API_Servece";
import { errorHandler } from "../../utils/errorHandler";
import { Loading } from "../../components/Loading/Loading";
import { NotFound } from "../NotFound/NotFound";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { AddToCartButton } from "../../components/AddToCartButton/AddToCartButton";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    async function fetchProductById() {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setMainImage(res.data.images?.[0]);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductById();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <NotFound />;

  const {
    images,
    title,
    category,
    price,
    rating,
    discountPercentage,
    reviews,
    description,
    stock
  } = product;

  const finalPrice = (price - (price * discountPercentage) / 100).toFixed(2);
  const filledStars = Math.floor(rating);

  return (
    <Row className="mt-4">
      {/* LEFT – Images */}
      <Col md={6}>
        <Card className="shadow-sm border-0 bg-dark">
          <Card.Body>
            <Image
              src={mainImage}
              fluid
              className="rounded mb-3"
              style={{ maxHeight: "420px", objectFit: "contain" }}
            />
            <div className="d-flex gap-2 justify-content-center">
              {images.map(img => (
                <Image
                  key={img}
                  src={img}
                  width={70}
                  height={70}
                  rounded
                  className={`border ${img === mainImage ? "border-light" : ""}`}
                  style={{ cursor: "pointer", objectFit: "cover" }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* RIGHT – Details */}
      <Col md={6}>
        <Card className="shadow-lg border-0 p-4 bg-dark text-white">
          <Badge bg="light" className=" text-centermb-2 w-fit text-uppercase my-2">
            <Link
              to={`/products?category=${category}`}
              className="text-dark text-decoration-none fw-bold py-2 px-3 d-block fs-6"
            >
              {category}
            </Link>
          </Badge>
          <h2 className="fw-bold text-uppercase ">{title}</h2>
          {/* Rating */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="fw-bold">{rating}</span>
            <div className="d-flex">
              {[...Array(5)].map((_, i) =>
                i < filledStars ? (
                  <FaStar key={i} className="text-warning" />
                ) : (
                  <CiStar key={i} className="text-warning" />
                )
              )}
            </div>
            <small className="text-light">({reviews.length} reviews)</small>
          </div>

          {/* Price */}
          <div className="mb-3">
            <span className="fs-3 fw-bold text-success me-2">${finalPrice}</span>
            <del className="text-light me-2">${price}</del>
            <Badge bg="light" text="dark">{discountPercentage.toFixed(1)}% OFF!!</Badge>
          </div>

          {/* Description */}
          <p className="text-light">{description}</p>

          {/* Stock */}
          <p className={stock > 0 ? "text-light fw-bold" : "text-danger fw-bold"}>
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Actions */}
          <div className="d-flex gap-3 mt-3 w-100">
            <AddToCartButton product={product} />
            <Link to="/cart"className="btn btn-outline-light">
              View Cart
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
