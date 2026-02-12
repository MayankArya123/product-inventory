import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Login from "./login/page";
import Register from "./register/page";
import ProductView from "./product-view/page";
import ProductList from "./components/product/productList";
import ProductForm from "./product-create/productForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product-view/:id" element={<ProductView />} />
        <Route path="/product-create" element={<ProductForm />} />
        <Route path="/product-edit/:id" element={<ProductForm />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
