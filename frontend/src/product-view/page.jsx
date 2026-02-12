import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./product-view.css";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);

        setProduct(res.data);
        setMainImage(res.data.images?.[0] || "");
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-view-container">
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>

      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></div>

      <div className="image-slider">
        <div className="main-image">
          {mainImage ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${mainImage}`}
              alt="Main Product"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="thumbnails">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${img}`}
              alt={`Thumbnail-${idx}`}
              className={mainImage === img ? "selected" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
