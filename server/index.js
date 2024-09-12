import express, { json } from "express";
import dotenv from 'dotenv'
import db from './config/Database.js'
import Router from './routes/index.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import Kematian from "./models/kematianModels.js";
import bedaNama from "./models/bedaNamaModels.js";
import belumMenikah from "./models/belumMenikahModels.js";
import domisiliUsaha from "./models/domisiliUsahaModels.js";
import kelakuanBaik from "./models/kelakuanBaik.js";
import tidakMampu from "./models/tidakMampuModels.js";
import usaha from "./models/usahaModels.js";
import ahliWaris from "./models/ahliWarisModels.js"
import Surat from "./models/suratModels.js"
import campuran from "./models/campuranModels.js"
import taksiranTanah from "./models/taksiranTanah.js"
import rekomendasiBbm from "./models/rekomendasiBbm.js";
import terdaftar from "./models/terdaftarModels.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT

try {
    await db.authenticate()
    console.log("Database Connected")
    await db.sync(Kematian)
    await db.sync(bedaNama)
    await db.sync(belumMenikah)
    await db.sync(domisiliUsaha)
    await db.sync(kelakuanBaik)
    await db.sync(tidakMampu)
    await db.sync(usaha)
    await db.sync(ahliWaris)
    await db.sync(Surat)
    await db.sync(campuran)
    await db.sync(taksiranTanah)
    await db.sync(rekomendasiBbm)
    await db.sync(terdaftar)

    // await db.sync()
} catch (error) {
    console.log(error)
}

app.use(cors({
    credentials:true, 
    // origin: 'https://suket-mataramtimur.vercel.app',
    origin: 'http://localhost:5173',
}))
app.use(cookieParser())
app.use(json())
app.use(Router)

app.listen(PORT, () => {console.log("App listen at port " + PORT)})