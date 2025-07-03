const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const productController = require("../controllers/productController");
const itemsRouter = express.Router();

// Middleware specific to this route
router.use((req, res, next) => {
  console.log('Product route middleware');
  next();
});

// Get all products
router.get("/", authenticateToken, productController.getProduct);
router.get("/:id", authenticateToken, productController.getProductDetail);
router.post("/", authenticateToken, productController.addProducts);
router.put("/:id", authenticateToken, productController.updateProductData); // Update a todo by ID
router.delete("/:id", authenticateToken, productController.deleteProduct);

// Create new product
// router.post('/', (req, res) => {
//   const { name, price } = req.body;
//   res.status(201).json({ id: 3, name, price });
// });

// Update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  res.json({ id, name, price });
});

// Delete product
// router.delete('/:id', (req, res) => {
//   res.status(204).end();
// });

module.exports = router;