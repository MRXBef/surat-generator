import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilNotes, cilTask, cilX, cilDataTransferUp} from '@coreui/icons'
import { useState, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import '../css/carry.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const KeteranganBedaNama = () => {
  // data diri
  const [nomorSuratIndex, setNomorSuratIndex] = useState('')
  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [ttl, setTtl] = useState('')
  const [jk, setJk] = useState('Laki-Laki')
  const [agama, setAgama] = useState('Islam')
  const [pekerjaan, setPekerjaan] = useState('')
  // orang yang sama
  const [orangBersangkutan, setOrangBersangkutan] = useState('')
  // tujuan
  const [keperluan, setKeperluan] = useState('')
  // saksi
  const [saksi1, setSaksi1] = useState('')
  const [saksi2, setSaksi2] = useState('')
  // yang mengetahui
  const [kepalaLembaga1,  setKepalaLembaga1] = useState('')
  const [lingkungan1,  setLingkungan1] = useState('')
  const [nip1,  setNip1] = useState('')

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
      `${import.meta.env.VITE_BASEURL}/surat/bedanama`,
      {
      data_diri: `${nomorSuratIndex || '-'},${nama},${nik},${tempatLahir}${ttl},${jk},${agama},${pekerjaan}`,
      yang_bersangkutan: `${orangBersangkutan}`,
      tujuan: `${keperluan}`,
      saksi: `${saksi1},${saksi2}`,
      kepala_lembaga1: `${kepalaLembaga1},${lingkungan1},${nip1}`,
      kepala_lembaga2: `${role},${namaTtd},${golongan},${nip}`
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
 
  const createPdf = () => {
    // Generate PDF content here
    const pdfContent = (
        <Document>
        <Page style={{padding: '50px'}}>
          <Text style={StyleSheet.create({textAlign: 'center', textDecoration: 'underline'})}>SURAT PERNYATAAN BEDA NAMA</Text>
          <Text style={StyleSheet.create({textAlign: 'center', fontSize: 12})}>{nomorSuratIndex === '' ? '' : `Nomor : ${nomorSuratIndex}`}</Text>
          <Text style={StyleSheet.create({marginTop: 30, fontSize: 12, textIndent: 50})}>Yang bertanda tangan di bawah ini menyatakan dengan sebenarnya dan sanggup diangkat sumpah bahwa: </Text>
          <View style={StyleSheet.create({marginTop: 20, display: 'flex', flexDirection: 'row', marginLeft: 80})}>
            <Text style={StyleSheet.create({fontSize: 12})}>Nama</Text>
            <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(nama)}</Text>
          </View>
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
            <Text style={StyleSheet.create({fontSize: 12})}>NIK</Text>
            <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {nik}</Text>
          </View>
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
            <Text style={StyleSheet.create({fontSize: 12})}>Jenis Kelamin</Text>
            <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {jk}</Text>
          </View>
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
            <Text style={StyleSheet.create({fontSize: 12})}>Tempat/tgl lahir</Text>
            <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(tempatLahir)}, {ttl.split('-').reverse().join('-')}</Text>
          </View>
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
            <Text style={StyleSheet.create({fontSize: 12})}>Agama</Text>
            <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {agama}</Text>
          </View>
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
            <Text style={StyleSheet.create({fontSize: 12})}>Pekerjaan</Text>
            <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(pekerjaan)}</Text>
          </View>
    
          <Text style={StyleSheet.create({fontSize: 12, textIndent: 50, marginTop: 30})}>Dengan ini menyatakan bahwa memang benar saya adalah oang yang sama di Sertifikat an. {orangBersangkutan.toUpperCase()} dengan yang di KTP an. {nama.toUpperCase()}</Text>
          <Text style={StyleSheet.create({fontSize: 12, textIndent: 50})}>Surat pernyataan ini diberikan kepada yang bersangkutan untuk KEPERLUAN {keperluan.toUpperCase()}, dan SURAT INI DIGUNAKAN UNTUK SATU KALI KEPERLUAN, dan apabila di kemudian hari keterangan ini tidak benar, maka yang bersangkutan bersedia di tuntut sesuai dengan hukum yang berlaku dan pihak Pejabat maupun Dinas atau Instansi Pemerintah terlepas dari segala tuntutan dan atau gugatan karena ini merupakan tanggung jawab yang bersangkutan, selanjutnya untuk diketahui dan di pergunakan sebagaimana mestinya.</Text>
    
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 300, marginTop: 30})}>
              <Text style={StyleSheet.create({fontSize: 12})}>Mataram, {tanggalSaatIni}</Text>
              <Text style={StyleSheet.create({fontSize: 12})}>Yang membuat pernyataan</Text>
              <Text style={StyleSheet.create({fontSize: 12, marginTop: 75, fontWeight: 'bold', textDecoration: 'underline'})}>{nama.toUpperCase()}</Text>
          </View>
          
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -300})}>
              <Text style={StyleSheet.create({fontSize: 12})}>Saksi-Saksi :</Text>
              <Text style={StyleSheet.create({fontSize: 12, marginTop: 10})}>1. {saksi1.toUpperCase()}</Text>
              <Text style={StyleSheet.create({fontSize: 12, marginTop: 10})}>2. {saksi2.toUpperCase()}</Text>
          </View>
    
            <Text style={StyleSheet.create({textAlign: 'center', fontSize: 12, marginTop: 10})}>Mengetahui :</Text>
    
            <View style={StyleSheet.create({width: '100%', height: 'auto', marginTop: 10, display: 'flex', flexDirection: 'row', gap: 100})}>
                <View style={StyleSheet.create({width: '50%'})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Tanggal :</Text>
                    <Text style={StyleSheet.create({fontSize: 12})}>Reg No: </Text>
                    <Text style={StyleSheet.create({fontSize: 12, textAlign: 'center'})}>Kepala Lembaga Kemasyarakatan Lingkungan {toUpperCaseFirstStr(lingkungan1)}</Text>
                    <Text style={StyleSheet.create({fontSize: 12, textAlign: 'center', marginTop: 75, textDecoration: 'underline', fontWeight: 'bold'})}>{kepalaLembaga1.toUpperCase()}</Text>
                    <Text style={StyleSheet.create({fontSize: 12, textAlign: 'center'})}>NIP. {nip1} </Text>
                    
                </View>
                <View style={StyleSheet.create({width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Mataram, {tanggalSaatIni}</Text>
                    <Text style={StyleSheet.create({fontSize: 12})}>a.n Camat Mataram,</Text>
                    <Text style={StyleSheet.create({fontSize: 12})}>{toUpperCaseFirstStr(role)}</Text>
                    <Text style={StyleSheet.create({fontSize: 12, marginTop: 75, fontWeight: 'bold', textDecoration: 'underline'})}>{namaTtd.toUpperCase()}</Text>
                    <Text style={StyleSheet.create({fontSize: 12, fontWeight: 'bold'})}>{toUpperCaseFirstStr(golongan)}</Text>
                    <Text style={StyleSheet.create({fontSize: 12, textAlign: 'center'})}>NIP. {nip}</Text>
                </View>
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
      <h1 className='mb-5 mt-5' style={{fontSize: '20px', color: 'white', fontWeight: 'bold', borderRadius: '10px', textAlign: 'center'}}><span><i style={{position: 'absolute', marginTop: '3px', marginLeft: '-30px'}}><CIcon icon={cilNotes}/></i></span> SURAT PERNYATAAN BEDA NAMA</h1>

      {/* DATA DIRI */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>NOMOR SURAT &  DATA DIRI</h1>
        <label className="label has-text-black">Nomor Surat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="OPSIONAL" onChange={(e) => {setNomorSuratIndex(e.target.value)}}/>
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
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setTempatLahir(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan tempat lahir</p>
        </div>
        <label className="label has-text-black">Tanggal Lahir</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="date" placeholder="" onChange={(e) => {setTtl(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan tanggal lahir</p>
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
        <label className="label has-text-black">Pekerjaan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setPekerjaan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan pekerjaan anda</p>
        </div>
      </div>

      {/* ORANG YANG SAMAA DI SERTIFIKAT */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30PX'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>ORANG YANG BERSANGKUTAN</h1>
        <label className="label has-text-black">Nama</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setOrangBersangkutan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama orang yang bersangkutan</p>
        </div>
      </div>

      {/* KEPERLUAN */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>TUJUAN</h1>
        <label className="label has-text-black">Keperluan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKeperluan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: Administrasi, Bank dan lain-lain</p>
        </div>
      </div>  

      {/* SAKSI */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>SAKSI</h1>
        <label className="label has-text-black">Saksi 1</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setSaksi1(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama saksi 1</p>
        </div>
        <label className="label has-text-black">Saksi 2</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setSaksi2(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama saksi 2</p>
        </div>
      </div>  
      
      {/* YANG MENGETAHUI*/}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>YANG MENGETAHUI (KEPALA LEMBAGA)</h1>
        <label className="label has-text-black">Kepala Lembaga</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKepalaLembaga1(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama kepala lembaga</p>
        </div>
        <label className="label has-text-black">Lingkungan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setLingkungan1(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama lingkungan lembaga</p>
        </div>
        <label className="label has-text-black">NIP</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="OPSIONAL" onChange={(e) => {setNip1(e.target.value)}}/>
            </div>
            <p className="help has-text-black">Contoh: 1928xxxxxxxxx</p>
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
            <p className="help has-text-black">Masukkan Nama penanda tangan</p>
        </div>
        <label className="label has-text-black">NIP</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="" onChange={(e) => {setNip(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: 1928xxxxxxxxx</p>
        </div>
      </div>

      <button className="button buttonku" style={{position: 'fixed', bottom: '5%', right: '5%', borderRadius: '50%', padding: '30px 40px 30px 40px', backgroundColor: 'black', border: '3px solid grey'}}>
        <i><CIcon icon={cilTask}/></i>
      </button>
      
      <div className={showPrint === 'hidden' ? 'hidden' : '' } style={{width: "100%", height: '101vh', paddingTop: '10px', paddingLeft: '200px', paddingRight: '200px', backgroundColor: 'black', marginBottom: '50px', position: 'fixed', left: '49.8%', top: '49.8%', transform: 'translate(-50%, -50%)', zIndex: '999999'}} >
        <i style={{position : 'absolute', right: '20px', top : '20px', transform: 'scale(1.2,1.2)', cursor: 'pointer', color: 'white'}} onClick={handleClosePrint}><CIcon icon={cilX} /></i>
        <i style={{position : 'absolute', right: '70px', top : '20px', transform: 'scale(1.2,1.2)', cursor: 'pointer', color: 'white'}} onClick={handleSaveToDb}><CIcon icon={cilDataTransferUp} /></i>
        {createPdf()}
      </div>
    </form>
  )
}

export default KeteranganBedaNama