const jwt = require("jsonwebtoken")

module.exports = function adminChecking(req, res, next) {
    try {
        const authorization = req.headers.authorization 
        
        if (!authorization) {
            return res.status(401).json({
                message: "Authorization not found"
            })
        }

        const bearer = authorization.split(" ")[0]
        const access_token = authorization.split(" ")[1]

        if (bearer !== "Bearer" || !access_token) {
            return res.status(401).json({
                message: "Bearer not found or token not found"
            })
        }

        const decode = jwt.verify(access_token, process.env.SEKRET_KEY)
        req.user = decode

        if (req.user.role !== "admin") {
            res.status(401).json({
                message: "You are not admin"
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
