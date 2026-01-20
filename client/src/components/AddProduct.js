import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_HOST } from "../config/global_constants";

function AddProduct() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("Kitchen");
    const [energyLabel, setEnergyLabel] = useState("A+++");
    const [annualKwh, setAnnualKwh] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        const newProduct = {
            name: name,
            brand: brand,
            category: category,
            energyLabel: energyLabel,
            annualKwh: Number(annualKwh),
            price: Number(price),
            stock: Number(stock),
            description: description,
            images: [image]
        };

        axios
            .post(`${SERVER_HOST}/products`, newProduct, {
                headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((res) => {
                if (res.data.errorMessage) {
                    setErrorMessage(res.data.errorMessage);
                } else {
                    navigate("/products");
                }
            })
            .catch(() => {
                setErrorMessage("Unable to add product");
            });
    }

    const fieldStyle = {
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px"
    };

    return (
        <div style={{ padding: "10px" }}>
            <h2>Add Sustainable Home Appliance</h2>

            {errorMessage && (
                <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div style={fieldStyle}>
                    <label>Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </div>

                <div style={fieldStyle}>
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Kitchen">Kitchen</option>
                        <option value="Laundry">Laundry</option>
                        <option value="Heating & Cooling">Heating & Cooling</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Smart Home">Smart Home</option>
                        <option value="Outdoor">Outdoor</option>
                    </select>
                </div>

                <div style={fieldStyle}>
                    <label>Energy Label (e.g. A+++)</label>
                    <input
                        type="text"
                        value={energyLabel}
                        onChange={(e) => setEnergyLabel(e.target.value)}
                        required
                    />
                </div>

                <div style={fieldStyle}>
                    <label>Annual Energy Use (kWh/year)</label>
                    <input
                        type="number"
                        min="0"
                        value={annualKwh}
                        onChange={(e) => setAnnualKwh(e.target.value)}
                        required
                    />
                </div>

                <div style={fieldStyle}>
                    <label>Price (€)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div style={fieldStyle}>
                    <label>Stock</label>
                    <input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>

                <div style={fieldStyle}>
                    <label>Description</label>
                    <textarea
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div style={fieldStyle}>
                    <label>Image path (e.g. /images/fridge1.jpg)</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
