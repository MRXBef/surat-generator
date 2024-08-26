import Users from "../models/userModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Register = async(req, res) => {
    const {firstName, lastName, email, password, confPassword} = req.body
    if(!firstName, !lastName, !email, !password, !confPassword) return res.status(400).json({msg: "All field are required"})
    if(password !== confPassword) return res.status(400).json({msg: "Password and confirm password must be match!"})

    try {
        async function getUniqueUsername(_firstName, _lastName) {
            let usernameUniq, isUnique = false

            while(!isUnique) {
                usernameUniq = `${_firstName}${_lastName}${Math.floor(Math.random() * 9000) + 1000}`
                const checkDb = await Users.findOne({
                    where: {username : usernameUniq}
                })
                if(!checkDb) isUnique = true
            }
            return usernameUniq
        }
        const uniqueUsername = await getUniqueUsername(firstName, lastName)

        const checkEmail = await Users.findOne({
            where: {email: email}
        })
        if(checkEmail) return res.status(403).json({msg: `Email for ${email} is already taken!`})

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        await Users.create({
            username: uniqueUsername,
            email: email,
            password: hashPassword,
            role: 'customer'
        })
        res.status(200).json({msg: "Register Successfully!"})
    } catch (error) { 
        console.log(error)
        res.status(500).json({msg: "Internal server error!"})
    }
}

export const Login = async(req, res) => {
    if(!req.body.email || !req.body.password) return res.status(400).json({msg: "Masukkan email atau password terlebih dahulu!"})
    try {
        const user = await Users.findOne({where : {email: req.body.email}})
        if(!user) return res.status(403).json({msg: "Email tidak ditemukan!!"})

        const result = await bcrypt.compare(req.body.password, user.password)
        if(!result) return res.status(400).json({msg : "Password salah!"})
        
        const userID = user.id, 
        username = user.username, 
        email = user.email, 
        role = user.role

        const accessToken = jwt.sign({userID, username, email, role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "20s"
        })
        const refreshToken = jwt.sign({userID, username, email, role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn : "1d"
        })

        await Users.update({refreshToken: refreshToken}, {where: {id: userID}})
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Pastikan ini sesuai dengan pengaturan HTTPS
            sameSite: 'lax', // 'lax' untuk mempermudah akses cookie
            path: '/', // Pastikan cookie tersedia di seluruh aplikasi
            maxAge: 24 * 60 * 60 * 1000, // Masa berlaku cookie (1 hari)
        });
        res.json({accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Internal server error!"})
    }
}

export const Logout = async(req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).json({ msg: "No refresh token provided" });
    }

    try {
        const user = await Users.findOne({ where: { refreshToken: refreshToken } });
        if (!user) return res.status(204)
        console.log(user)

        const userID = user.id;
        await Users.update({ refreshToken: null }, { where: { id: userID } });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        }).status(200).json({ msg: "Logout successful!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error!" });
    }
}


export const isUserLoggedIn = async(req, res) => {
    const {refreshToken} = req.cookies
    if(refreshToken == undefined) return res.sendStatus(403)
    try {
        const user = await Users.findOne({
            where: {refreshToken : refreshToken}
        })
        if(!user) return res.status(403).json({msg: "User not found"})
        res.sendStatus(200)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Internal server error!"})
    }
}