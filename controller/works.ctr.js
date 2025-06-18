const { v4 } = require("uuid")
const { read_file, write_file } = require("../fs/data")

const getAllWorks = (req, res, next) => {
    try {
        const fileData = read_file("works.json")
        res.status(200).json(fileData)
    } catch (error) {
        next(error)
    }
}


const getOneWork = (req, res, next) => {
    try {
        const { id } = req.params
        const fileData = read_file("works.json")

        const foundedWork = fileData.find((item) => item.id === id)

        if (!foundedWork) {
            throw BaseError.BadRequest(404, "Work not found")
        }

        res.status(200).json(foundedWork)
    } catch (error) {
        next(error)
    }
}


const addWork = (req, res, next) => {
    try {
        const { title, company, location, salary, technologies } = req.body
        const fileData = read_file("works.json")

        fileData.push({
            id: v4(),
            title,
            company,
            location,
            salary,
            technologies
        })

        write_file("works.json", fileData)
        res.status(200).json({
            message: "Add new work"
        })
    } catch (error) {
        next(error)
    }
}


const updateWork = (req, res, next) => {
    try {
        const { id } = req.params
        const { title, company, location, salary, technologies } = req.body
        const fileData = read_file("works.json")

        const foundedWork = fileData.find((item) => item.id === id)

        if (!foundedWork) {
            throw BaseError.BadRequest(404, "Work not found")
        }

        fileData.forEach((item) => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.company = company ? company : item.company
                item.location = location ? location : item.location
                item.salary = salary ? salary : item.salary
                item.technologies = technologies ? technologies : item.technologies
            }
        })

        write_file("works.json", fileData)
        res.status(200).json({
            message: "Updated work"
        })
    } catch (error) {
        next(error)
    }
}


const deleteWork = (req, res, next) => {
    try {
        const { id } = req.params
        const fileData = read_file("works.json")

        const foundedWork = fileData.find((item) => item.id === id)

        if (!foundedWork) {
            throw BaseError.BadRequest(404, "Work not found")
        }

        fileData.forEach((item, idx) => {
            if (item.id === id) {
                fileData.splice(idx, 1)
            }
        })

        write_file("works.json", fileData)
        res.status(200).json({
            message: "Deleted work"
        })
    } catch (error) {
        next(error)
    }
}

    
module.exports = {
    getAllWorks,
    getOneWork,
    addWork,
    updateWork,
    deleteWork
}