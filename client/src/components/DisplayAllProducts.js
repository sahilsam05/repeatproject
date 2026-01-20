import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

function DisplayAllProducts() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${SERVER_HOST}/products`)
            .then((res) => {
                if (res.data.errorMessage) {
                    setErrorMessage(res.data.errorMessage);
                } else {
                    setProducts(res.data);
                }
            })
            .catch(() => {
                setErrorMessage("Unable to load products");
            });
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <h2>Sustainable Home Appliances</h2>

            {errorMessage && (
                <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
            )}

            <table
                border="1"
                cellPadding="6"
                style={{ width: "100%", borderCollapse: "collapse" }}
            >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Energy Label</th>
                    <th>kWh/year</th>
                    <th>Price (€)</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.brand}</td>
                        <td>{p.energyLabel}</td>
                        <td>{p.annualKwh}</td>
                        <td>{p.price}</td>
                        <td>{p.stock}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayAllProducts;
