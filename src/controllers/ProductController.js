const ProductService = require("../services/ProductService")

// create product
const createProduct = async(req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;

        if(!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        } 

        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// update product
const updateProduct = async(req, res) => {
    try {
        const productId = req.params.id
        const data = req.body

        if(!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The product id is required'
            })
        }

        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

// delete product
const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id

        if(!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The product id is required'
            })
        }

        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

// get all product
const getAllProduct = async(req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(limit || 8, page - 1 || 0, sort, filter)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

// get detail product
const getDetailProduct = async(req, res) => {
    try {
        const productId = req.params.id

        if(!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The product id is required'
            })
        }

        const response = await ProductService.getDetailProduct(productId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getDetailProduct,
    deleteProduct
}