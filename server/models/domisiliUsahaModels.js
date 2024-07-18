import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const domisiliUsaha = db.define(
    'domisiliUsaha',
    {   
        data_usaha: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        surat_pengantar: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        tujuan: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        yang_ttd: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }
)

export default domisiliUsaha