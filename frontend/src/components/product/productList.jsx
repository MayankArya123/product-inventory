import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./productList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get(`/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    alert("Product Deleted");
    fetchProducts();
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
              <img
                src={"https://picsum.photos/seed/picsum/200/300"}
                alt="image"
              />
            </div>

            <div className="card-bottom">
              <div className="top-info">
                <span>{product?.name}</span>
                <span>₹{product.price}</span>
              </div>

              <p>{product.description}</p>

              <button
                className="edit-btn"
                onClick={() => setSelectedProduct(product)}
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
        ))}
      </div>
    </div>
  );
};

export default ProductList;
