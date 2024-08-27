import jwt from "jsonwebtoken";
import Users from "../models/userModels.js";

export const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    const user = await Users.findOne({
        where: {refreshToken: token}
    })
    if(!user) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) res.sendStatus(403)
        req.email = decoded.email
        next()
    })
}