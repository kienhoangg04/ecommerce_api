const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController")
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', productController.createProduct)
router.put('/update/:id', authMiddleWare, productController.updateProduct)
router.get('/get-all', productController.getAllProduct)
router.get('/get-details/:id', productController.getDetailProduct)
router.delete('/delete/:id', productController.deleteProduct)

module.exports = router;