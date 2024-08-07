import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilNotes, cilTask, cilX, cilDataTransferUp} from '@coreui/icons'
import { useState, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import mataram from '../assets/img/mataram.png'
import '../css/carry.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const KeteranganTanah = () => {
  // data diri
  const [nomorSuratIndex, setNomorSuratIndex] = useState('')
  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [tempatLahir, setTempatlahir] = useState('')
  const [ttl, setTtl] = useState('')
  const [jk, setJk] = useState('Laki-Laki')
  const [status, setStatus] = useState('Menikah')
  const [agama, setAgama] = useState('Islam')
  const [kewarganegaraan, setKewarganegaraan] = useState('WNI')
  const [pekerjaan, setPekerjaan] = useState('')
  const [alamat, setAlamat] = useState('')
  // surat pengantar
  const [dari, setDari] = useState('Kepala Lingkungan')
  const [rt, setRt] = useState('')
  const [lingkungan, setLingkungan] = useState('')
  const [nomorSurat, setNomorSurat] = useState('')
  // tanah
  const [luasBumi, setLuasBumi] = useState('')
  const [luasBangunan, setLuasBangunan] = useState('')
  const [noTanah, setNoTanah] = useState('')
  const [anTanah, setAnTanah] = useState('')
  const [hargaTanah, setHargaTanah] = useState('')
  // yang bertanda tangan
  const [role,  setRole] = useState('Lurah')
  const [namaTtd, setNamaTtd] = useState('')
  const [golongan, setGolongan] = useState('')
  const [nip, setNip] = useState('')
  // -----------------------------------------------------
  const [isRtSelected, setIsRtSelected] = useState(false);
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

const satuan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];

const terbilang = (nilai) => {
    nilai = Math.abs(nilai);
    let hasil = "";
  
    if (nilai < 12) {
      hasil = satuan[nilai];
    } else if (nilai < 20) {
      hasil = terbilang(nilai - 10) + " belas";
    } else if (nilai < 100) {
      hasil = terbilang(Math.floor(nilai / 10)) + " puluh " + terbilang(nilai % 10);
    } else if (nilai < 200) {
      hasil = "seratus " + terbilang(nilai - 100);
    } else if (nilai < 1000) {
      hasil = terbilang(Math.floor(nilai / 100)) + " ratus " + terbilang(nilai % 100);
    } else if (nilai < 2000) {
      hasil = "seribu " + terbilang(nilai - 1000);
    } else if (nilai < 1000000) {
      hasil = terbilang(Math.floor(nilai / 1000)) + " ribu " + terbilang(nilai % 1000);
    } else if (nilai < 1000000000) {
      hasil = terbilang(Math.floor(nilai / 1000000)) + " juta " + terbilang(nilai % 1000000);
    } else if (nilai < 1000000000000) {
      hasil = terbilang(Math.floor(nilai / 1000000000)) + " milyar " + terbilang(nilai % 1000000000);
    } else if (nilai < 1000000000000000) {
      hasil = terbilang(Math.floor(nilai / 1000000000000)) + " triliun " + terbilang(nilai % 1000000000000);
    }
  
    return hasil.trim();
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "Ketua RT") {
        setIsRtSelected(true);
        setDari(`Ketua RT ${rt}`)
    } else {
        setIsRtSelected(false);
        setDari('Kepala Lingkungan')
    }
  };

  const handleRtSelected = (e) => {
    const value = e.target.value
    setDari(`Ketua RT ${value}`)
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
      const response = await axios.get('http://localhost:5000/token')
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
        const response = await axios.get('http://localhost:5000/token')
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
        'http://localhost:5000/surat/taksirantanah',
        {
        data_diri: `${nomorSuratIndex},${nama},${nik},${tempatLahir}${tempatLahir}${ttl},${jk},${status},${agama},${kewarganegaraan},${pekerjaan},${alamat}`,
        surat_pengantar: `${dari},${lingkungan},${nomorSurat}`,
        tanah: `${luasBumi},${luasBangunan},${noTanah},${anTanah}`,
        harga_tanah: `${hargaTanah}`,
        yang_ttd: `${role},${namaTtd},${nip}`
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
      console.log(error)
    }
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number).replace('IDR', 'Rp').trim();
};
//ENDTOKEN HANDLER
 
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

        <Text style={StyleSheet.create({textAlign: 'center', textDecoration: 'underline', fontSize: 15, marginTop: 10})}>SURAT KETERANGAN TAKSIRAN HARGA TANAH DAN BANGUNAN</Text>
        <Text style={StyleSheet.create({textAlign: 'center', fontSize: 12})}>Nomor : {nomorSuratIndex.toUpperCase()}</Text>
        <Text style={StyleSheet.create({marginTop: 30, fontSize: 12, textIndent: 50})}>Yang bertanda tangan dibawah ini Lurah Mataram Timur, Kecamatan Mataram, Kota Mataram, menerangkan bahwa :</Text>
        <View style={StyleSheet.create({marginTop: 20, display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Nama</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(nama)}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>NIK</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {nik}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Tempat/tgl lahir</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(tempatLahir)}, {ttl.split('-').reverse().join('-')}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Jenis Kelamin</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {jk}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Status</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {status}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Agama</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {agama}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Kewarganegaraan</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {kewarganegaraan}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Pekerjaan</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(pekerjaan)}</Text>
        </View>
        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
          <Text style={StyleSheet.create({fontSize: 12})}>Alamat</Text>
          <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(alamat)}</Text>
        </View>

        <Text style={StyleSheet.create({fontSize: 12, textIndent: 50, marginTop: 30})}>Berdasarkan surat pengantar dari {dari} {toUpperCaseFirstStr(lingkungan)} Nomor: {(nomorSurat)} tanggal {tanggalSaatIni}, menerangkan dengan sebenarnya bahwa : </Text>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>1. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Memang benar yang Namanya tersebut diatas adalah penduduk yang bertempat tinggal di wilayah kami yaitu Lingkungan {toUpperCaseFirstStr(lingkungan)} Kelurahan Mataram Timur Kecamatan Mataram. Yang memiliki sebidang tanah dengan segala sesuatu yang berdiri diatasnya berupa Bumi seluas {luasBumi} M², dan Bangunan seluas {luasBangunan} M² No. {noTanah.toUpperCase()} An. {anTanah.toUpperCase()}.</Text>
        </View>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5})}>
              <Text style={StyleSheet.create({fontSize: 12})}>2. </Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Harga Bumi dan Bangunan tersebut berkisar antara : {rupiah(hargaTanah)} ({terbilang(hargaTanah).toUpperCase()} RUPIAH)</Text>
        </View>

        <Text style={StyleSheet.create({marginTop: 30, fontSize: 12, textIndent: 50})}>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</Text>

        <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 300, marginTop: 30})}>
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
      <h1 className='mb-5 mt-5' style={{fontSize: '20px', color: 'white', fontWeight: 'bold', borderRadius: '10px', textAlign: 'center'}}><span><i style={{position: 'absolute', marginTop: '3px', marginLeft: '-30px'}}><CIcon icon={cilNotes}/></i></span> SURAT KETERANGAN TANAH</h1>

      {/* DATA DIRI */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>NOMOR SURAT & DATA DIRI</h1>
        <label className="label has-text-black">Nomor Surat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNomorSuratIndex(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nomor surat</p>
        </div>
        <label className="label has-text-black">Nama</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNama(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama anda</p>
        </div>
        <label className="label has-text-black">NIK</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="" onChange={(e) => {setNik(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: 5324XXXXXXXXXXX</p>
        </div>
        <label className="label has-text-black">Tempat Lahir</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setTempatlahir(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan Tempat Lahir</p>
        </div>
        <label className="label has-text-black">Tanggal Lahir</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="date" placeholder="" onChange={(e) => {setTtl(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan Tanggal Lahir</p>
        </div>
        <label className="label has-text-black">Jenis Kelamin</label>
        <div className="field">
            <div className="control select is-fullwidth">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setJk(e.target.value)}} required>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <p className="help has-text-black">Pilih Kelamin</p>
        </div>
        <label className="label has-text-black">Status</label>
        <div className="field">
            <div className="control select is-fullwidth">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setStatus(e.target.value)}} required>
                      <option value="Menikah">Menikah</option>
                      <option value="Belum Menikah">Belum Menikah</option>
                      <option value="Cerai Hidup">Cerai Hidup</option>
                      <option value="Cerai Mati">Cerai Mati</option>
                </select>
            </div>
            <p className="help has-text-black">Pilih status</p>
        </div>
        <label className="label has-text-black">Agama</label>
        <div className="field">
            <div className="control select is-fullwidth">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setAgama(e.target.value)}} required>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Khonghucu">Khonghucu</option>
                </select>
            </div>
            <p className="help has-text-black">Pilih Agama</p>
        </div>
        <label className="label has-text-black">Kewarganegaraan</label>
        <div className="field">
            <div className="control select is-fullwidth">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKewarganegaraan(e.target.value)}} required>
                  <option value="WNI">WNI</option>
                  <option value="WNA">WNA</option>
                </select>
            </div>
            <p className="help has-text-black">Pilih Kewarganegaraan</p>
        </div>
        <label className="label has-text-black">Pekerjaan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setPekerjaan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan pekerjaan anda</p>
        </div>
        <label className="label has-text-black">Alamat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setAlamat(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan alamat anda</p>
        </div>
      </div>

      {/* SURAT PENGANTAR */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30PX'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>SURAT PENGANTAR</h1>
        <label className="label has-text-black">Dari</label>
        <div className="field">
            <div className="control select is-fullwidth">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={handleSelectChange} required>
                  <option value="Kepala Lingkungan">Kepala Lingkungan</option>
                  <option value="Ketua RT">RT</option>
                </select>
            </div>
            <p className="help has-text-black">Pilih dari mana surat pengantar anda</p>

            {/* jika memilih rt maka form rt akan muncul */}
            {isRtSelected && (
                <div className="field">
                    {/* Form RT disini */}
                    <label className="label has-text-black">Nomor RT</label>
                    <div className="control">
                        <input
                            className="input is-fullwidth has-background-white has-text-black"
                            type="number"
                            placeholder="Masukkan Nomor RT"
                            onChange={handleRtSelected}
                            required
                        />
                    </div>
                    <p className="help has-text-black">Masukkan nomor RT</p>
                </div>
            )}
        </div>
        <label className="label has-text-black">Lingkungan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setLingkungan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: Karang Bedil</p>
        </div>
        <label className="label has-text-black">Nomor Surat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNomorSurat(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: 042/KrBedil/IV/2024</p>
        </div>
      </div>

      {/* TANAH */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>TANAH</h1>
        <label className="label has-text-black">Luas Bumi</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setLuasBumi(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan luas bumi</p>
        </div>
        <label className="label has-text-black">Luas Bangunan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setLuasBangunan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan luas bangunan</p>
        </div>
        <label className="label has-text-black">No Tanah</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNoTanah(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan no tanah</p>
        </div>
        <label className="label has-text-black">Atas Nama</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setAnTanah(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan atas nama</p>
        </div>
        <label className="label has-text-black">Harga Tanah</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="" onChange={(e) => {setHargaTanah(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan harga tanah</p>
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

export default KeteranganTanah