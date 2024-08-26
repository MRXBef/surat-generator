import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilNotes, cilTask, cilX, cilDataTransferUp} from '@coreui/icons'
import { useState, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import mataram from '../assets/img/mataram.png'
import '../css/carry.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const KeteranganBbm = () => {
  // data rekomendasi
  const [nomorSuratIndex, setNomorSuratIndex] = useState('')
  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [alamat, setAlamat] = useState('')
  const [konsumen, setKonsumen] = useState('')
  const [kegiatan, setKegiatan] = useState('')

//kebutuhan dan sarana
const [jenisAlat, setJenisAlat] = useState('')
const [jumlahAlat, setJumlahAlat] = useState('')
const [jenisBbm, setJenisBbm] = useState('')
const [kebutuhanBbm, setKebutuhanBbm] = useState('')
const [jamOperasi, setJamOperasi] = useState('')
const [konsumsi, setKonsumsi] = useState('')
const [jumlah, setJumlah] = useState('')
const [tempatPengambilan, setTempatPengambilan] = useState('')
const [nomorPenyalur, setNomorPenyalur] = useState('')
const [lokasiSPBU, setLokasiSPBU] = useState('')
const [masaBerlaku, setMasaBerlaku] = useState('')

  // yang bertanda tangan
  const [role,  setRole] = useState('Lurah')
  const [namaTtd, setNamaTtd] = useState('')
  const [golongan, setGolongan] = useState('')
  const [nip, setNip] = useState('')
  // -----------------------------------------------------
  const [showPrint, setShowPrint] = useState('hidden')

  const now = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const tanggalSaatIni = now.toLocaleDateString('id-ID', options);

  const toUpperCaseFirstStr = (str) => {
    let arr = [], finalArr = []
    str.split(' ').forEach(element => {
          arr.push(element)
    });
    arr.forEach(e => {finalArr.push(e.replace(/^\w/, (c) => c.toUpperCase()))})
  return finalArr.join(' ')
}

  const handlePrint = (e) => {
    e.preventDefault()
    setShowPrint('')
  }

  const handleClosePrint = () => {
    setShowPrint('hidden')
  }

// TOKEN HANDLER
  useEffect(() => {
    refreshToken()
}, [])

const [token, setToken] = useState('')
const [expire, setExpire] = useState('')

const refreshToken = async() => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/token`)
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setExpire(decoded.exp)
  } catch (error) {
      if(error.response){
          navigate('/')
      }
  }
}

const axiosJWT = axios.create()
axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date()
    if(expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/token`)
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
        setToken(response.data.accessToken)
        const decoded = jwtDecode(response.data.accessToken)
        setExpire(decoded.exp)
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

  const handleSaveToDb = async() => {
    try {
      const response = await axiosJWT.post(
        `${import.meta.env.VITE_BASEURL}/surat/bbm`,
        {
        data_rekomendasi: `${nomorSuratIndex},${nama},${nik},${alamat},${konsumen},${kegiatan}`,
        kebutuhan_dan_sarana: `${jenisAlat},${jumlahAlat},${jenisBbm},${kebutuhanBbm},${jamOperasi},${konsumsi},${jumlah},${tempatPengambilan}.${nomorPenyalur},${lokasiSPBU},${masaBerlaku}`,
        yang_ttd: `${role},${namaTtd},${golongan},${nip}`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(response.status == 200) {
        alert("Data berhasil disimpan ke Database")
        setShowPrint('hidden')
      }
    } catch (error) {
      console.log(error.response)
    }
  }
//ENDTOKEN HANDLER

const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0
    },
    tableRow: {
      flexDirection: "row"
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10
    }
  });
 
  const createPdf = () => {
    // Generate PDF content here
    const pdfContent = (
      <Document>
        <Page style={{padding: 50}}>
          <View style={StyleSheet.create({width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '2px solid black', paddingBottom: 5})}>
              <View style={StyleSheet.create({width: '15%', display: 'flex', justifyContent: 'center'})}>
                  <Image style={StyleSheet.create({width: 50, height: 65, marginLeft: 50})} src={mataram}/>
              </View>
              <View style={StyleSheet.create({width: '85%'})}>
                  <Text style={StyleSheet.create({textAlign: 'center', fontSize: 15})}>PEMERINTAH KOTA MATARAM</Text>
                  <Text style={StyleSheet.create({textAlign: 'center', fontSize: 15})}>KECAMATAN MATARAM</Text>
                  <Text style={StyleSheet.create({textAlign: 'center', fontSize: 15})}>KELURAHAN MATARAM TIMUR</Text>
                  <Text style={StyleSheet.create({textAlign: 'center', fontSize: 10})}>Jalan Seruling No. 9 Kr. Bedil Mataram Telp.  (0370) 622435 Kode Pos 83121</Text>
              </View>
          </View>
          <View style={StyleSheet.create({width: '100%', borderBottom: '1px solid black', marginTop: 1})}></View>

        <Text style={StyleSheet.create({textAlign: 'center', textDecoration: 'underline', fontSize: 15, marginTop: 10})}>SURAT REKOMENDASI PEMBELIAN BBM JENIS TERTENTU</Text>
        <Text style={StyleSheet.create({textAlign: 'center', fontSize: 12})}>Nomor : {nomorSuratIndex.toUpperCase()}</Text>
        <Text style={StyleSheet.create({marginLeft: -50, fontSize: 12, textIndent: 50})}>Dasar Hukum :</Text>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>1. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Undang-undang Nomor 22 Tahun 2021 tentang Minyak Bumi dan Gas sebagaimana telah diubah dengan Undang-undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-undang.</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>2. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Undang-undang Nomor 32 Tahun 2024 tentang Pemerintah Daerah.</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>3. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Perpres nomor 15 Tahun 2012 tentang Harga Jual Eceran dan konsumen penggunaan jasa Bahan Bakar Minyak sebagaimana telah diubah beberapakali terakhir.</Text>
        </View>

        <Text style={StyleSheet.create({marginLeft: -50, marginTop: 5, fontSize: 12, textIndent: 50})}>Dengan ini memberikan rekomendasi kepada:  :</Text>

        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row', marginTop: 5})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Nik</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {toUpperCaseFirstStr(nik)}</Text>
        </View>
        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row'})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Nama</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {toUpperCaseFirstStr(nama)}</Text>
        </View>
        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row'})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Alamat</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {alamat}</Text>
        </View>
        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row'})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Konsumen Pengguna</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {konsumen}</Text>
        </View>
        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row'})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Jenis Usaha/Kegiatan</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {kegiatan}</Text>
        </View>
        
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>4. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Berdasarkan hasil verifikasi, kebutuhan BBM digunakan untuk sarana sebagai berikut:</Text>
        </View>

        <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Jenis Alat</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Jumlah Alat</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>BBM Jenis Tertentu</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Kebutuhan BBM Jenis Tertentu</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Jam atau Hari Operasi</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Konsumsi Jenis BBM tertentu Liter Per ( Jam / Hari / Minggu / Bulan )</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Jumlah</Text>
          </View>
        </View>
        {/* Data Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{jenisAlat}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{jumlahAlat}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{jenisBbm}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{kebutuhanBbm}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{jamOperasi}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{konsumsi}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{jumlah}</Text>
          </View>
        </View>
        {/* Tambahkan lebih banyak baris data sesuai kebutuhan */}
      </View>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>5. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Diberikan alokasi volume Bensin (Gaseoline) RON 88/Minyak Solar (Gas Oli):</Text>
        </View>

        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row', marginTop: 5})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Jumlah</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {jumlah}</Text>
        </View>
        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row', marginTop: 5})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Tempat Pengambilan</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {tempatPengambilan}</Text>
        </View>
        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row', marginTop: 5})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Nomor Lembaga Penyalur</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {nomorPenyalur}</Text>
        </View>
        <View style={StyleSheet.create({ display: 'flex', flexDirection: 'row', marginTop: 5})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Lokasi SPBU</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 120})}>: {lokasiSPBU}</Text>
        </View>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>6. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Masa berlaku Surat Rekomendasi sampai dengan {masaBerlaku}</Text>
        </View>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>7. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Apabila penggunaan Surat Rekomendasi ini tidak sebagaimana mestinya, maka akan dicabut dan ditindak lanjuti dengan proses hukum sesuai dengan ketentuan dan peraturan perundang-undangan.</Text>
        </View>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 300, marginTop: 5})}>
            <Text style={StyleSheet.create({fontSize: 12})}>Mataram, {tanggalSaatIni}</Text>
            <Text style={StyleSheet.create({fontSize: 12})}>a.n Camat Mataram</Text>
            <Text style={StyleSheet.create({fontSize: 12})}>{role},</Text>
            <Text style={StyleSheet.create({fontSize: 12, marginTop: 75, fontWeight: 'bold', textDecoration: 'underline'})}>{namaTtd.toUpperCase()}</Text>
            <Text style={StyleSheet.create({fontSize: 12, fontWeight: 'bold'})}>{toUpperCaseFirstStr(golongan)}</Text>
            <Text style={StyleSheet.create({fontSize: 12, textAlign: 'center'})}>NIP. {nip} </Text>
        </View>
        </Page>
      </Document>
    );

    // window.open(pdfContent, "PRINT", "height=400,width=600");
    return (
      <PDFViewer style={{ width: '100%', height: '85vh', marginTop: '50px', display: '' }}>
        {pdfContent}
      </PDFViewer>
    );
    
  };

  return (
    <form action="" style={{width: '100%'}} onSubmit={handlePrint}>
      <h1 className='mb-5 mt-5' style={{fontSize: '20px', color: 'white', fontWeight: 'bold', borderRadius: '10px', textAlign: 'center'}}><span><i style={{position: 'absolute', marginTop: '3px', marginLeft: '-30px'}}><CIcon icon={cilNotes}/></i></span> SURAT REKOMENDASI BBM</h1>

      {/* DATA REKOMENDASI */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>NOMOR SURAT & DATA REKOMENDASI</h1>
        <label className="label has-text-black">Nomor Surat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNomorSuratIndex(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nomor surat</p>
        </div>
        <label className="label has-text-black">Nik</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNik(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nik anda</p>
        </div>
        <label className="label has-text-black">Nama</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNama(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama anda</p>
        </div>
        <label className="label has-text-black">Alamat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setAlamat(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan alamat anda</p>
        </div>
        <label className="label has-text-black">Konsumen Pengguna</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKonsumen(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan konsumen pengguna</p>
        </div>
        <label className="label has-text-black">Jenis Usaha Kegiatan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKegiatan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan jenis usaha/kegiatan</p>
        </div>
      </div>

      {/* KEBUTUHAN DAN SARANA */}
      <div className="data-diri" style={{marginTop: '30px', backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>KEBUTUHAN DAN SARANA</h1>
        <label className="label has-text-black">Jenis Alat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setJenisAlat(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan jenis alat</p>
        </div>
        <label className="label has-text-black">Jumlah Alat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setJumlahAlat(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan jumlah alat</p>
        </div>
        <label className="label has-text-black">Jenis BBM</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setJenisBbm(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan jenis bbm</p>
        </div>
        <label className="label has-text-black">Kebutuhan BBM (Liter)</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKebutuhanBbm(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan kebutuhan bbm</p>
        </div>
        <label className="label has-text-black">Jam Operasi</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setJamOperasi(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan jam operasi</p>
        </div>
        <label className="label has-text-black">Konsumsi BBM</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKonsumsi(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan konsumsi bbm</p>
        </div>
        <label className="label has-text-black">Jumlah</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setJumlah(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan jumlah</p>
        </div>
        <label className="label has-text-black">Tempat Pengambilan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setTempatPengambilan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan tempat pengambilan</p>
        </div>
        <label className="label has-text-black">Nomor Lembaga Penyalur</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNomorPenyalur(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nomor lembaga penyalur</p>
        </div>
        <label className="label has-text-black">Lokasi SPBU</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setLokasiSPBU(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan lokasi SPBU</p>
        </div>
        <label className="label has-text-black">Masa Berlaku Surat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setMasaBerlaku(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: 7 Agustus 2022</p>
        </div>
      </div>
      
      {/* YANG BERTANDA TANGAN */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>YANG BERTANDA TANGAN</h1>
        <label className="label has-text-black">Jabatan</label>
        <div className="field">
            <div className="control select is-fullwidth">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setRole(e.target.value)}} required>
                  <option value="Lurah">Lurah</option>
                  <option value="Sekretaris Lurah">Sekretaris Lurah</option>
                </select>
            </div>
            <p className="help has-text-black">Pilih jabatan penanda tangan</p>
        </div>
        <label className="label has-text-black">Nama</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNamaTtd(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan Nama penanda tangan</p>
        </div>
        <label className="label has-text-black">Pangkat Golongan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setGolongan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan pangkat golongan</p>
        </div>
        <label className="label has-text-black">NIP</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="" onChange={(e) => {setNip(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: 1928xxxxxxxxx</p>
        </div>
      </div>

      <button className="button" style={{position: 'fixed', bottom: '5%', right: '5%', borderRadius: '50%', padding: '30px 40px 30px 40px', backgroundColor: 'black', border: '3px solid grey'}}>
        <i><CIcon icon={cilTask}/></i>
      </button>
      
      <div className={showPrint === 'hidden' ? 'hidden' : '' } style={{width: "100%", height: '101vh', paddingTop: '10px', paddingLeft: '200px', paddingRight: '200px', backgroundColor: 'black', marginBottom: '50px', position: 'fixed', left: '49.8%', top: '49.8%', transform: 'translate(-50%, -50%)' , zIndex: '999999'}} >
        <i style={{position : 'absolute', right: '20px', top : '20px', transform: 'scale(1.2,1.2)', cursor: 'pointer', color: 'white'}} onClick={handleClosePrint}><CIcon icon={cilX} /></i>
        <i style={{position : 'absolute', right: '70px', top : '20px', transform: 'scale(1.2,1.2)', cursor: 'pointer', color: 'white'}} onClick={handleSaveToDb}><CIcon icon={cilDataTransferUp} /></i>
        {createPdf()}
      </div>
    </form>
  )
}

export default KeteranganBbm