const { v4 } = require("uuid")
const { read_file, write_file } = require("../fs/data")

const getAllFruits = (req, res, next) => {
    try {
        const fileData = read_file("fruits.json")
        res.status(200).json(fileData)
    } catch (error) {
        next(error)
    }
}


const getOneFruit = (req, res, next) => {
    try {
        const { id } = req.params
        const fileData = read_file("fruits.json")

        const foundedFruit = fileData.find((item) => item.id === id)

        if (!foundedFruit) {
            throw BaseError.BadRequest(404, "Fruit not found")
        }

        res.status(200).json(foundedFruit)
    } catch (error) {
        next(error)
    }
}


const addFruit = (req, res, next) => {
    try {
        const { title, color, price } = req.body
        const fileData = read_file("fruits.json")

        fileData.push({
            id: v4(),
            title,
            color,
            price
        })

        write_file("fruits.json", fileData)
        res.status(200).json({
            message: "Add new fruit"
        })
    } catch (error) {
        next(error)
    }
}


const updateFruit = (req, res, next) => {
    try {
        const { id } = req.params
        const { title, color, price } = req.body
        const fileData = read_file("fruits.json")

        const foundedFruit = fileData.find((item) => item.id === id)

        if (!foundedFruit) {
            throw BaseError.BadRequest(404, "Fruit not found")
        }

        fileData.forEach((item) => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.color = color ? color : item.color
                item.price = price ? price : item.price
            }
        })

        write_file("fruits.json", fileData)
        res.status(200).json({
            message: "Updated fruit"
        })
    } catch (error) {
        next(error)
    }
}


const deleteFruit = (req, res, next) => {
    try {
        const { id } = req.params
        const fileData = read_file("fruits.json")

        const foundedFruit = fileData.find((item) => item.id === id)

        if (!foundedFruit) {
            throw BaseError.BadRequest(404, "Fruit not found")
        }

        fileData.forEach((item, idx) => {
            if (item.id === id) {
                fileData.splice(idx, 1)
            }
        })

        write_file("fruits.json", fileData)
        res.status(200).json({
            message: "Deleted fruit"
        })
    } catch (error) {
        next(error)
    }
}

    
module.exports = {
    getAllFruits,
    getOneFruit,
    addFruit,
    updateFruit,
    deleteFruit
}