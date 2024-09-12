import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const domisiliLembaga = db.define(
    'domisililembaga',
    {   
        data_diri: {
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
    },
    {
        freezeTableName: true
    }
)

export default domisiliLembaga