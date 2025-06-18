const BaseError = require("../error/baseError")
const { read_file, write_file } = require("../fs/data")
const { v4 } = require("uuid")


//getAll
const getAllProducts = async (req, res, next) => {
    try {
        const fileData = read_file("products.json")
        res.status(200).json(fileData)
    } catch (error) {
        next(error);
    }
}

/// addTodo
const addProduct = async (req, res, next) => {
    try {
        const { title, desk, price } = req.body
        const fileData = read_file("products.json")
        fileData.push({
            id: v4(),
            title,
            desk,
            price
        })
        write_file("products.json", fileData)
        res.status(201).json({
            message: "Added new product "
        })
    } catch (error) {
        next(error);
    }
}

/// getOne 
const getOneProduct = async (req, res, next) => {
    try {
        const { id } = req.params

        const fileData = read_file("products.json")

        const foundedProduct = fileData.find((item) => item.id === id)

        if (!foundedProduct) {
            throw BaseError.BadRequest(404, "Product not found")
        }
        res.status(200).json(foundedProduct)
    } catch (error) {
        next(error);
    }
}

////update 
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, desk, price } = req.body

        const fileData = read_file("products.json")

        const foundedProduct = fileData.find((item) => item.id === id)

        if (!foundedProduct) {
            throw BaseError.BadRequest(404, "Product not found")
        }

        fileData.forEach((item) => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.desk = desk ? desk : item.desk
                item.price = price ? price : item.price
            }
        });
        write_file("products.json", fileData)
        res.status(201).json({
            message: "update  product "
        })
    } catch (error) {
        next(error);
    }
}


///delete 
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const fileData = read_file("products.json")
        const foundedProduct = fileData.find((item) => item.id === id)
        if (!foundedProduct) {
            throw BaseError.BadRequest(404, "Product not found")
        }

        fileData.forEach((item, idx) => {
            if (item.id === id) {
                fileData.splice(idx, 1)
            }
        });
        write_file("products.json", fileData)
        res.status(201).json({
            message: "Deleted product "
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}
