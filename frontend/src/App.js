import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Login from "./login/page";
import Register from "./register/page";
import ProductView from "./components/product/productList";
import ProductList from "./components/product/productList";
import ProductForm from "./product-create/productForm";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product-view/:slug" element={<ProductView />} />
        <Route path="/product-create" element={<ProductForm />} />
        <Route path="/product-edit/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default App;
