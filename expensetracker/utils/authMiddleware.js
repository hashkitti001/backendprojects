/* Check if user is authenticated */
const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
     const reqToken = req.cookies.token
     if(!reqToken){
        return res.status(403).json({message: "You are not authorized to perform this action. Please log in again"})
     }
    const validToken = jwt.verify(reqToken, process.env.JWT_KEY)
    if(!validToken){
        res.status(409).json({message: "Invalid token. Please log in again"})
    }
    req.user = validToken
    next()
}

module.exports = authMiddleware
