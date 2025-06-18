const { v4 } = require("uuid")
const { read_file, write_file } = require("../fs/data")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const fileData = read_file("auth.json")

        const foundedEmail = fileData.find((user) => user.email === email)
        if (foundedEmail) {
            return res.status(401).json({
                message: "User already exists"
            })
        }

        const foundedUsername = fileData.find((user) => user.username === username)
        if (foundedUsername) {
            return res.status(401).json({
                message: "User already exists"
            })
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
        res.status(500).json({
            message: error.message
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const fileData = read_file("auth.json")

        const foundedEmail = fileData.find((user) => user.email === email)

        if (!foundedEmail) {
            return res.status(401).json({
                message: "User not found"
            })
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
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    register,
    login
}