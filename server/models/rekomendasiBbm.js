import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const rekomendasiBbm = db.define(
    'rekomendasiBbm',
    {   
        data_rekomendasi: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        kebutuhan_dan_sarana: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        yang_ttd: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }
)

export default rekomendasiBbm