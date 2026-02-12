import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get(`/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product Deleted successfully");
      fetchProducts();
    } catch (err) {}
  };

  return (
    <div>
      <h3 className="products-header">
        {products.length === 0
          ? "No Products please add product"
          : `Total products ${products.length}`}
      </h3>

      <div className="products-list">
        {products?.map((product) => (
          <div key={product._id} className="product-card">
            <div className="card-image-box">
              {product?.images && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${product?.images[0]}`}
                  alt={`images-${product?.name}`}
                />
              )}
            </div>

            <div className="card-bottom">
              <div className="top-info">
                <span>{product?.name}</span>
                <span>₹{product.price}</span>
              </div>

              <div
                className="text-truncate"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>

              <div className="btns-warpper">
                <button
                  className="view-product"
                  onClick={() => {
                    navigate(`/product-view/${product?._id}`);
                  }}
                >
                  {" "}
                  view
                </button>
                <div className="btns">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      navigate(`/product-edit/${product?._id}`);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
