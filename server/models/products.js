const mongoose = require("mongoose");

let productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    energyLabel: { type: String, required: true }, // e.g. A+++
    annualKwh: { type: Number, required: true, min: 0 }, // kWh/year
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    images: [{ type: String, required: true }] // keep simple for now
});

module.exports = mongoose.model("products", productsSchema);
