const { v4 } = require("uuid")
const { read_file, write_file } = require("../fs/data")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const BaseError = require("../error/baseError")


const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const fileData = read_file("auth.json")

        const foundedEmail = fileData.find((user) => user.email === email)
        if (foundedEmail) {
            throw BaseError.UnAuthorized("Email already exists")
        }

        const foundedUsername = fileData.find((user) => user.username === username)
        if (foundedUsername) {
            throw BaseError.UnAuthorized("Username already exists")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        fileData.push({
            id: v4(),
            username,
            email,
            password: hashPassword,
            role: "user"
        })

        write_file("auth.json", fileData)
        res.status(201).json({
            message: "Registered"
        })

    } catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const fileData = read_file("auth.json")

        const foundedEmail = fileData.find((user) => user.email === email)

        if (!foundedEmail) {
            throw BaseError.UnAuthorized("User already exists")
        }

        const decodePassword = await bcrypt.compare(password, foundedEmail.password)

        const payload = { email: foundedEmail.email, id: foundedEmail.id, role: foundedEmail.role }

        if (decodePassword) {
            const token = jwt.sign(payload, process.env.SEKRET_KEY, {expiresIn: "20m"})
            res.status(200).json({
                message: "Success",
                token
            })
        } else {
            res.status(400).json({
                message: "Wrong password"
            })
        }

    } catch (error) {
        next(error)
    }
}


module.exports = {
    register,
    login
}