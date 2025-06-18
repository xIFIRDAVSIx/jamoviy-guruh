const BaseError = require("../error/baseError");

module.exports = function errorMiddleware(err, res, res, next) {
    if (err instanceof BaseError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: "Internal server error"})
}