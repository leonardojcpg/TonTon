export default class AppError extends Error {
    constructor(message, statusCode){
        super(message)
    }
}