import Users from "../models/userModels.js";
import jwt from 'jsonwebtoken'

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)

        const user = await Users.findOne({where : {refreshToken: refreshToken}})
        if(!user) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403)
            const userID = user.id
            const username = user.username
            const email = user.email
            const role = user.role
            const accessToken = jwt.sign({userID, username, email, role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'})

            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Internal server error!"})
    }
}