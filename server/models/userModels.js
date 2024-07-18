import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Users = db.define(
    'users',
    {
        username : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.TEXT
        }
    }
)

export default Users