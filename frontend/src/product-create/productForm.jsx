import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./productForm.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setSelectedProduct(res?.data);
      setForm({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
      });
      setExistingImages(res?.data?.images || []);
    } catch (err) {
      // console.log("error in getting product");
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...filesArray]);
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.images;
      return updated;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);

    if (selectedProduct) {
      existingImages.forEach((img) => formData.append("existingImages", img));
      newImages.forEach((file) => formData.append("images", file));

      try {
        await API.put(`/products/${selectedProduct._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product Updated");
        navigate("/");
      } catch (err) {
        if (err.response?.data?.errors) {
          const formattedErrors = {};

          err.response.data.errors.forEach((error) => {
            formattedErrors[error.path] = error.msg;
          });

          setErrors(formattedErrors);
        }
      }
    } else {
      newImages.forEach((file) => formData.append("images", file));

      try {
        await API.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product Created");
        setForm({ name: "", price: "", description: "" });
        navigate("/");
      } catch (err) {
        if (err.response?.data?.errors) {
          const formattedErrors = {};

          err.response.data.errors.forEach((error) => {
            formattedErrors[error.path] = error.msg;
          });

          setErrors(formattedErrors);
        }
      }
    }
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

        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <CKEditor
          editor={ClassicEditor}
          data={form.description}
          onChange={(event, editor) => {
            const data = editor.getData();
            setForm((prev) => ({ ...prev, description: data }));
            setErrors((prev) => {
              const updated = { ...prev };
              delete updated.description;
              return updated;
            });
          }}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <input type="file" name="images" multiple onChange={handleFileChange} />

        {errors.images && <p className="error">{errors.images}</p>}

        {(existingImages || newImages) &&
          (existingImages.length > 0 || newImages.length > 0) && (
            <p> Total {existingImages.length + newImages.length} images </p>
          )}
        <div className="all-images">
          {[...existingImages].map((img, idx) => (
            <div key={`exist-${idx}`} className="image-preview">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${img}`}
                alt={`product-${idx}`}
              />
              <button
                type="button"
                className="remove-img-btn"
                onClick={() =>
                  setExistingImages(existingImages.filter((_, i) => i !== idx))
                }
              >
                ×
              </button>
            </div>
          ))}

          {[...newImages].map((file, idx) => (
            <div key={`new-${idx}`} className="image-preview">
              <img src={URL.createObjectURL(file)} alt={`new-${idx}`} />
              <button
                type="button"
                className="remove-img-btn"
                onClick={() =>
                  setNewImages(newImages.filter((_, i) => i !== idx))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button className="create-update-btn" type="submit">
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
