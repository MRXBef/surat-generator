import express from 'express'
import { refreshToken } from '../controllers/refreshToken.js'
import { createKematian,createAhliWaris,createBedaNama,createBelumMenikah,createDomisiliUsaha,createKelakuanBaik,createTidakMampu,createUsaha,findDataByYears,findAllSurat,changeNomorSurat,getNomorSuratByName,createCampuran,createTaksiranTanah, createBbm, createTerdaftar, createDomisiliLembaga} from '../controllers/surat.js'
import { isUserLoggedIn, Login, Logout, Register } from '../controllers/Users.js'
import {verifyToken} from "../middleware/verifyToken.js"

const Router = express.Router()

Router.post('/register', Register)
Router.post('/login', Login)
Router.get('/login', isUserLoggedIn)
Router.get('/token', refreshToken)
Router.delete('/logout', Logout)

Router.get('/surat', verifyToken, findAllSurat)
Router.put('/surat/:id', changeNomorSurat)
Router.get('/surat/nomor/:id', getNomorSuratByName)

Router.post('/surat/kematian', verifyToken, createKematian)
Router.post('/surat/ahliwaris', verifyToken, createAhliWaris)
Router.post('/surat/bedanama', verifyToken, createBedaNama)
Router.post('/surat/belummenikah', verifyToken, createBelumMenikah)
Router.post('/surat/domisiliusaha', verifyToken, createDomisiliUsaha)
Router.post('/surat/kelakuanbaik', verifyToken, createKelakuanBaik)
Router.post('/surat/tidakmampu', verifyToken, createTidakMampu)
Router.post('/surat/terdaftar', verifyToken, createTerdaftar)
Router.post('/surat/domisililembaga', verifyToken, createDomisiliLembaga)
Router.post('/surat/campuran', verifyToken, createCampuran)
Router.post('/surat/usaha', verifyToken, createUsaha)
Router.post('/surat/taksirantanah', verifyToken, createTaksiranTanah)
Router.post('/surat/bbm', verifyToken, createBbm)

Router.get('/laporan/:tahun', verifyToken, findDataByYears)


export default Router