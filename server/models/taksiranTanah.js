import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const taksiranTanah = db.define(
    'taksiranTanah',
    {   
        data_diri: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        surat_pengantar: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        tanah: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        harga_tanah: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        yang_ttd: {
            type: DataTypes.STRING(225),
            allowNull: false
        },
    }
)

export default taksiranTanah