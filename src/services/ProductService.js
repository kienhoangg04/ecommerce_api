const Product = require("../models/ProductModel")

// create
const createProduct = (newProduct) => {
    return new Promise(async(resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct;

        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }

            // Tao moi product
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock, 
                rating, 
                description
            })

            if(newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// update 
const updateProduct = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

// delete product
const deleteProduct = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete Product Success'
            })
        } catch (error) {
            reject(error)
        }
    })
}

// get all product
const getAllProduct = (limit, page, sort, filterr) => {
    return new Promise(async(resolve, reject) => {
        try {
            const totalProduct = await Product.count();

            // if(sort) {
            //     const objectSort = {}
            //     objectSort[sort[0]] = sort[1]
            //     const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);

            //     resolve({
            //         status: 'OK',
            //         message: 'All Product Success',
            //         total: totalProduct,
            //         totalPage: Math.ceil(totalProduct / limit),
            //         pageCurrent: page + 1,
            //         data: allProductSort
            //     })
            // }

            if (filterr){
                const objectFilter = {}
                objectFilter[sort[0]] = sort[1]
                console.log(objectFilter)
                const allProductFilter = await Product.find(objectFilter);

                resolve({
                    status: 'OK',
                    message: 'All Product Success',
                    total: totalProduct,
                    totalPage: Math.ceil(totalProduct / limit),
                    pageCurrent: page + 1,
                    data: allProductFilter
                })
            } 
                
            // const allProduct = await Product.find().limit(limit).skip(page * limit);
            
            // resolve({
            //     status: 'OK',
            //     message: 'All Product Success',
            //     total: totalProduct,
            //     totalPage: Math.ceil(totalProduct / limit),
            //     pageCurrent: page + 1,
            //     data: allProduct
            // })
        } catch (error) {
            reject(error)
        }
    })
}

// get detail product
const getDetailProduct = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: product
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct
}