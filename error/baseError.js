module.exports = class BaseError extends Error {
    status
    errors
    constructor(status, message, errors) {
        this.status = status
        this.errors = errors
    }

    static BadRequest(status, message, errors = []) {
        return new BaseError(status, message, errors)
    }

    static UnAuthorized(message, errors = []) {
        return new BaseError(401, message, errors)
    }

    static notFound(message, errors = []) {
        return new BaseError(401, message, errors)
    }
}