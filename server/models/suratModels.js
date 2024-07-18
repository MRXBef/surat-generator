import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Surat = db.define(
    'tb_surat',
    {   
        nama_surat: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        nomor_surat: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }
)

export default Surat