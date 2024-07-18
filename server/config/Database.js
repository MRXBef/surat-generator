import { Sequelize } from "sequelize";

const db = new Sequelize('surat', 'root', '', {
    host: "localhost",
    dialect: 'mysql',
    timezone:"+08:00"
})

export default db