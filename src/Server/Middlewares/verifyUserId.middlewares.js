import AppError from "../Errors/App.error.js"
import { client } from "../database.js"

export const verifyUserId = async(req, res, next) =>{
    const {userId} = req.params

    const queryResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1',
        [userId]
    )
    if(!queryResult.rowCount){
        throw new AppError("Client not found")
    }
    const foundClient = queryResult.rows[0]
    res.locals = {...res.locals, foundClient}
    return next()
    
}