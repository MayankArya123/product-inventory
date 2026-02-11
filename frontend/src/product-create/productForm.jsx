import React, { useState } from "react";
import API from "../services/api";
import "./productForm.css";

const ProductForm = ({ selectedProduct }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: [],
  });

  React.useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProduct) {
      await API.put(`/products/${selectedProduct._id}`, form);
      alert("Product Updated");
    } else {
      await API.post("/products", form);
      alert("Product Created");
    }

    setForm({ name: "", price: "", description: "" });
  };

  return (
    <div className="product-form-container">
      <h3>{selectedProduct ? "Update Product" : "Create Product"}</h3>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          // required={!selectedProduct}
        />

        <button type="submit">
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
