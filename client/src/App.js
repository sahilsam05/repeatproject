import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DisplayAllProducts from "./components/DisplayAllProducts";
import AddProduct from "./components/AddProduct";
import Register from "./components/Register";
import Login from "./components/Login"; // we’ll create this next

function App() {
    return (
        <BrowserRouter>
            <div style={{ padding: "10px" }}>
                <nav style={{ marginBottom: "10px" }}>
                    <Link to="/">Home</Link>{" "}
                    <Link to="/products">Products</Link>{" "}
                    <Link to="/addProduct">Add Product</Link>{" "}
                    <Link to="/register">Register</Link>{" "}
                    <Link to="/login">Login</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<div>EcoHome Appliances</div>} />
                    <Route path="/products" element={<DisplayAllProducts />} />
                    <Route path="/addProduct" element={<AddProduct />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
