import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const ahliWaris = db.define(
    'ahliwaris',
    {   
        pewaris: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        jumlah_orang: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tujuan: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        saksi: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        kepala_lembaga: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        kelurahan: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }
)

export default ahliWaris