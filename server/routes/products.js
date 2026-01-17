const router = require(`express`).Router();

const productsModel = require(`../models/products`);

// GET all products
router.get(`/products`, async function (req, res) {
    try {
        const products = await productsModel.find();
        res.json(products);
    } catch (err) {
        res.json({ errorMessage: `Unable to retrieve products` });
    }
});

// GET one product by id
router.get(`/products/:id`, async function (req, res) {
    try {
        const product = await productsModel.findById(req.params.id);

        if (!product) {
            return res.json({ errorMessage: `Product not found` });
        }

        res.json(product);
    } catch (err) {
        res.json({ errorMessage: `Product not found` });
    }
});

// POST create product (ADMIN ONLY)
router.post(`/products`, async function (req, res) {
    if (req.user.accessLevel !== parseInt(process.env.ACCESS_LEVEL_ADMIN || `2`)) {
        return res.json({ errorMessage: `Not authorized` });
    }

    try {
        let product = new productsModel(req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.json({ errorMessage: `Unable to add product` });
    }
});

// PUT update product (ADMIN ONLY)
router.put(`/products/:id`, async function (req, res) {
    if (req.user.accessLevel !== parseInt(process.env.ACCESS_LEVEL_ADMIN || `2`)) {
        return res.json({ errorMessage: `Not authorized` });
    }

    try {
        const product = await productsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.json({ errorMessage: `Unable to update product` });
        }

        res.json(product);
    } catch (err) {
        res.json({ errorMessage: `Unable to update product` });
    }
});

// DELETE product (ADMIN ONLY)
router.delete(`/products/:id`, async function (req, res) {
    if (req.user.accessLevel !== parseInt(process.env.ACCESS_LEVEL_ADMIN || `2`)) {
        return res.json({ errorMessage: `Not authorized` });
    }

    try {
        const product = await productsModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.json({ errorMessage: `Unable to delete product` });
        }

        res.json({ message: `Product deleted` });
    } catch (err) {
        res.json({ errorMessage: `Unable to delete product` });
    }
});

module.exports = router;
