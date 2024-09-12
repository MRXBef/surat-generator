import { Op } from "sequelize"
import bedaNama from "../models/bedaNamaModels.js"
import Kematian from "../models/kematianModels.js"
import ahliWaris from "../models/ahliWarisModels.js"
import belumMenikah from "../models/belumMenikahModels.js"
import domisiliUsaha from "../models/domisiliUsahaModels.js"
import kelakuanBaik from "../models/kelakuanBaik.js"
import tidakMampu from "../models/tidakMampuModels.js"
import usaha from "../models/usahaModels.js"
import Surat from "../models/suratModels.js"
import campuran from "../models/campuranModels.js"
import taksiranTanah from "../models/taksiranTanah.js"
import rekomendasiBbm from "../models/rekomendasiBbm.js"
import terdaftar from "../models/terdaftarModels.js"
import domisiliLembaga from "../models/domisiliLembaga.js"

export const createKematian = async(req, res) => {
    const {data_diri, surat_pengantar, tujuan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !tujuan || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await Kematian.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createBedaNama = async(req, res) => {
    const {data_diri, yang_bersangkutan, tujuan, saksi, kepala_lembaga1, kepala_lembaga2} =req.body
    if(!data_diri || !yang_bersangkutan || !tujuan || !saksi || !kepala_lembaga1 || !kepala_lembaga2){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await bedaNama.create({
            data_diri: data_diri,
            yang_bersangkutan: yang_bersangkutan,
            tujuan: tujuan,
            saksi: saksi,
            kepala_lembaga1: kepala_lembaga1,
            kepala_lembaga2: kepala_lembaga2
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createAhliWaris = async(req, res) => {
    const {pewaris, jumlah_orang, tujuan, saksi, kepala_lembaga, kelurahan} =req.body
    if(!pewaris || !jumlah_orang || !tujuan || !saksi || !kepala_lembaga || !kelurahan){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await ahliWaris.create({
            pewaris: pewaris,
            jumlah_orang: jumlah_orang,
            tujuan: tujuan,
            saksi: saksi,
            kepala_lembaga: kepala_lembaga,
            kelurahan: kelurahan
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createBelumMenikah = async(req, res) => {
    const {data_diri, surat_pengantar, tujuan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !tujuan || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await belumMenikah.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createKelakuanBaik = async(req, res) => {
    const {data_diri, surat_pengantar, tujuan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !tujuan || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await kelakuanBaik.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createTidakMampu = async(req, res) => {
    const {data_diri, surat_pengantar, tujuan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !tujuan || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await tidakMampu.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createTerdaftar = async(req, res) => {
    const {data_diri, surat_pengantar, tujuan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await terdaftar.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createDomisiliLembaga = async(req, res) => {
    const {data_diri, surat_pengantar, tujuan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await domisiliLembaga.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createCampuran = async(req, res) => {
    const {data_diri, surat_pengantar, pernyataan, tujuan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !pernyataan || !tujuan || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await campuran.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            pernyataan: pernyataan,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createDomisiliUsaha = async(req, res) => {
    const {data_usaha, surat_pengantar, tujuan, yang_ttd} =req.body
    if(!data_usaha || !surat_pengantar || !tujuan || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await domisiliUsaha.create({
            data_usaha: data_usaha,
            surat_pengantar: surat_pengantar,
            tujuan: tujuan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });

    }
}

export const createUsaha = async(req, res) => {
    const {data_diri, surat_pengantar, usaha_keperluan, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !usaha_keperluan || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await usaha.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            usaha_keperluan: usaha_keperluan,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
    }
}

export const createBbm = async(req, res) => {
    const {data_rekomendasi, kebutuhan_dan_sarana, yang_ttd} =req.body
    if(!data_rekomendasi || !kebutuhan_dan_sarana || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await rekomendasiBbm.create({
            data_rekomendasi: data_rekomendasi,
            kebutuhan_dan_sarana: kebutuhan_dan_sarana,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
    }
}

export const createTaksiranTanah = async(req, res) => {
    const {data_diri, surat_pengantar, tanah, harga_tanah, yang_ttd} =req.body
    if(!data_diri || !surat_pengantar || !tanah || !harga_tanah || !yang_ttd){
        return res.status(400).json({msg: "Semua data harus diisikan!"})
    }

    try {
        await taksiranTanah.create({
            data_diri: data_diri,
            surat_pengantar: surat_pengantar,
            tanah: tanah,
            harga_tanah, harga_tanah,
            yang_ttd: yang_ttd
        })
        res.status(200).json({msg: "Surat berhasil diupload!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
    }
}

//GET DATA BY TAHUN
export const findDataByYears = async (req, res) => {
    const tahun = req.params['tahun'];

    const bulanMapping = {
        '01': 'Januari',
        '02': 'Februari',
        '03': 'Maret',
        '04': 'April',
        '05': 'Mei',
        '06': 'Juni',
        '07': 'Juli',
        '08': 'Agustus',
        '09': 'September',
        '10': 'Oktober',
        '11': 'November',
        '12': 'Desember'
    };

    // Objek untuk memetakan nama model asli ke nama yang diinginkan
    const modelNameMapping = {
        usaha: 'Surat Keterangan Usaha',
        belumMenikah: 'Surat Keterangan Belum Menikah',
        domisiliUsaha: 'Surat Keterangan Domisili Usaha',
        tidakMampu: 'Surat Keterangan Tidak Mampu',
        bedaNama: 'Surat Pernyataan Beda Nama',
        Kematian: 'Surat Keterangan Kematian',
        kelakuanBaik: 'Surat Pengantar Kelakuan Baik',
        ahliWaris: 'Surat Keterangan Ahli Waris',
        campuran: 'Surat Keterangan Campuran',
        taksiranTanah: 'Surat Keterangan Tanah',
        rekomendasiBbm: 'Surat Keterangan Bbm',
        terdaftar: 'Surat Keterangan Terdaftar',
    };

    try {
        const models = {
            usaha,
            belumMenikah,
            domisiliUsaha,
            tidakMampu,
            bedaNama,
            Kematian,
            kelakuanBaik,
            ahliWaris,
            campuran,
            taksiranTanah,
            rekomendasiBbm,
            terdaftar
        };

        const dataPerBulan = Object.keys(models).reduce((acc, modelName) => {
            acc[modelName] = Object.keys(bulanMapping).reduce((bulanAcc, key) => {
                bulanAcc[bulanMapping[key]] = 0;
                return bulanAcc;
            }, {});
            return acc;
        }, {});
        for (const [modelName, model] of Object.entries(models)) {
            const records = await model.findAll({
                where: {
                    createdAt: {
                        [Op.and]: [
                            { [Op.gte]: new Date(`${tahun}-01-01`) },
                            { [Op.lt]: new Date(`${tahun}-12-31`) }
                        ]
                    }
                }
            });
            records.forEach(record => {
                const createdAt = new Date(record.createdAt);
                const bulan = String(createdAt.getMonth() + 1).padStart(2, '0');
                const namaBulan = bulanMapping[bulan];

                dataPerBulan[modelName][namaBulan]++;
            });
        }
        const sortedDataPerBulan = {};
        Object.keys(dataPerBulan).forEach(modelName => {
            sortedDataPerBulan[modelNameMapping[modelName]] = {};
            Object.keys(bulanMapping).forEach(key => {
                sortedDataPerBulan[modelNameMapping[modelName]][bulanMapping[key]] = dataPerBulan[modelName][bulanMapping[key]];
            });
        });
        res.json(sortedDataPerBulan);
    } catch (error) {
        console.error('Error saat mencari dan menghitung data per bulan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
    }
};


export const findAllSurat = async(req, res) => {
    try {
        const surat = await Surat.findAll({
            attributes: ['id', 'nama_surat', 'nomor_surat']
        })
        if(!surat) return res.status(400).json({msg: "Surat tidak ditemukan"})
        res.status(200).json({surat})
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
    }
}

export const changeNomorSurat = async(req, res) => {
    const suratId = req.params['id']
    const {nomor_surat} = req.body
    try {
        const surat = await Surat.findOne({
            where: {
                id: suratId
            }
        })
        if(!surat) return res.status(400).json({msg: "Surat tidak ditemukan"})
        surat.nomor_surat = nomor_surat || surat.nomor_surat
        surat.save()
        res.status(200).json({msg: "Berhasil mengganti nomor surat"})
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
    }
}

export const getNomorSuratByName = async(req, res) => {
    const id = req.params['id']
    try {
        const surat = await Surat.findOne({
            attributes: ['nomor_surat'],
            where: {id : id}
        })
        if(!surat) return res.status(400).json({msg: "Surat tidak ditemukan"})
        res.status(200).json({surat})
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
    }
}