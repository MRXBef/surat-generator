import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const bedaNama = db.define(
    'bedanama',
    {   
        data_diri: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        yang_bersangkutan: {
            type: DataTypes.STRING(255),
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
        kepala_lembaga1: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        kepala_lembaga2: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }
)

export default bedaNama