import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilNotes, cilTask, cilX, cilDataTransferUp} from '@coreui/icons'
import { useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import '../css/carry.css'
import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const KeteranganAhliWaris = () => {
    //pewaris
    const [nomorSuratIndex, setNomorSuratIndex] = useState('')
    const [namaPewaris, setNamaPewaris] = useState('')
  // data diri
  const [jumlahOrang, setJumlahOrang] = useState(1)
  const [dataDiri, setDataDiri] = useState([
    { nama: '', nik: '', ttl: '', jk: 'Laki-Laki', agama: 'Islam', pekerjaan: '', hubunganWaris: '', alamat: '' }
  ]);
  // tujuan
  const [keperluan, setKeperluan] = useState('')
  // saksi
  const [saksi1, setSaksi1] = useState('')
  const [saksi2, setSaksi2] = useState('')
  // yang mengetahui
  const [kepalaLembaga,  setKepalaLembaga] = useState('')
  const [lingkunganLembaga,  setLingkunganLembaga] = useState('')
  const [nipLembaga,  setNipLembaga] = useState('')
  
  const [role,  setRole] = useState('Lurah')
  const [namaTtd, setNamaTtd] = useState('')
  const [golongan, setGolongan] = useState('')
  const [nip, setNip] = useState('')
  const [namaCamat, setNamaCamat] = useState('')
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

  const handleJumlahOrangChange = (e) => {
    const jumlah = parseInt(e.target.value, 10);
    setJumlahOrang(jumlah);
    // Perbarui array dataDiri berdasarkan jumlah orang yang dipilih
    const newDataDiri = [];
    for (let i = 0; i < jumlah; i++) {
      newDataDiri.push(dataDiri[i] || { nama: '', nik: '', ttl: '', jk: 'Laki-Laki', agama: 'Islam', pekerjaan: '', hubunganWaris: '', alamat: '' });
    }
    setDataDiri(newDataDiri);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newDataDiri = [...dataDiri];
    newDataDiri[index] = {
      ...newDataDiri[index],
      [name]: value
    };
    setDataDiri(newDataDiri);
  };

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
        `${import.meta.env.VITE_BASEURL}/surat/ahliwaris`,
        {
        pewaris: `${nomorSuratIndex || "-"},${namaPewaris}`,
        jumlah_orang: parseInt(jumlahOrang),
        tujuan: `${keperluan}`,
        saksi: `${saksi1},${saksi2}`,
        kepala_lembaga: `${kepalaLembaga},${lingkunganLembaga},${nipLembaga}`,
        kelurahan: `${role},${namaTtd},${nip},${namaCamat}`
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
          <Text style={StyleSheet.create({textAlign: 'center', textDecoration: 'underline'})}>SURAT PERNYATAAN AHLI WARIS</Text>
          <Text style={StyleSheet.create({textAlign: 'center', fontSize: 11})}>{nomorSuratIndex === '' ? '' : `Nomor: ${nomorSuratIndex}`}</Text>
          <Text style={StyleSheet.create({marginTop: 30, fontSize: 11, textIndent: 50})}>Yang bertanda tangan di bawah ini {dataDiri.length > 1 ? 'kami dari' : 'saya'} AHLI WARIS dari mendiang {toUpperCaseFirstStr(namaPewaris)} menyatakan dengan sebenarnya dan sanggup diangkat sumpah bahwa: </Text>
    
            {/* LOOP */}
            {dataDiri.map((data, index) => (
            <View key={index} style={StyleSheet.create({display: 'flex', flexDirection: 'column'})}>
                <View style={StyleSheet.create({marginTop: 20, display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({marginLeft: -100, fontSize: 11, position: 'absolute', width: 200, left: 80})}>{index + 1}. </Text>
                    <Text style={StyleSheet.create({fontSize: 11})}>Nama</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(data.nama)}</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>NIK</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {data.nik}</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Jenis Kelamin</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {data.jk}</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Tempat/tgl lahir</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(data.ttl)}</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Agama</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {data.agama}</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Pekerjaan</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(data.pekerjaan)}</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Hubungan Waris</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(data.hubunganWaris)}</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Alamat</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 11, position: 'absolute', width: 200, left: 80})}>: {toUpperCaseFirstStr(data.alamat)}</Text>
                </View>
            </View>
            ))}

            {/* ENDLOOP */}
    
          <Text style={StyleSheet.create({fontSize: 11, textIndent: 50, marginTop: 30})}>Memang benar yang tertera di atas merupakan anak kandung dari mendiang {toUpperCaseFirstStr(namaPewaris)} yang telah meninggal dunia dan sebagai ahli waris yang sah.</Text>
          <Text style={StyleSheet.create({fontSize: 11, textIndent: 50})}>Surat pernyataan ini diberikan kepada yang bersangkutan dengan untuk keperluan {keperluan.toUpperCase()} dan SURAT INI DIGUNAKAN UNTUK SATU KALI KEPERLUAN. Apabila di kemudian hari keterangan ini tidak benar, maka yang bersangkutan bersedia di tuntut sesuai dengan hukum yang berlaku dan pihak Pejabat maupun Dinas atau Instansi Pemerintah terlepas dari segala tuntutan dan atau gugatan karena ini merupakan tanggung jawab yang bersangkutan selaku ahli waris, selanjutnya untuk diketahui dan di pergunakan sebagaimana mestinya.</Text>
    
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 280, marginTop: 30})}>
            <Text style={StyleSheet.create({fontSize: 11})}>Mataram, {tanggalSaatIni}</Text>
            <Text style={StyleSheet.create({fontSize: 11, marginBottom: 20})}>Yang membuat pernyataan</Text>
    
            {/* LOOP */}
            {dataDiri.map((data, index) => (
            <View key={index} style= {StyleSheet.create({display: 'flex', flexDirection: 'row', marginBottom: '30px'})}>
              <View style={StyleSheet.create({width: 100, display: "flex", gap: '10px'})} >
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>1. </Text>
                    <View style={StyleSheet.create({width: '100%', height: 'auto'})}>
                        <Text style={StyleSheet.create({fontSize: 11})}>{toUpperCaseFirstStr(data.nama)}</Text>
                    </View>
                </View>
              </View>
              <View style={StyleSheet.create({width: 100, display: "flex", gap: '10px'})} >
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>______________</Text>
                </View>
              </View>
            </View>
            ))}
            {/* ENDLOOP */}
              
          </View>
          
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -300})}>
              <Text style={StyleSheet.create({fontSize: 11})}>Saksi-Saksi :</Text>
                <View style= {StyleSheet.create({display: 'flex', flexDirection: 'row', marginBottom: '30px', marginTop: '20px'})}>
                    <View style={StyleSheet.create({width: 75, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 11})}>1. </Text>
                            <View style={StyleSheet.create({width: '100%', height: 'auto'})}>
                                <Text style={StyleSheet.create({fontSize: 11})}>{toUpperCaseFirstStr(saksi1)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={StyleSheet.create({width: 100, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 11})}>______________</Text>
                        </View>
                    </View>
                </View>
                <View style= {StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                    <View style={StyleSheet.create({width: 75, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 11})}>2. </Text>
                            <View style={StyleSheet.create({width: '100%', height: 'auto'})}>
                                <Text style={StyleSheet.create({fontSize: 11})}>{toUpperCaseFirstStr(saksi2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={StyleSheet.create({width: 100, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 11})}>______________</Text>
                        </View>
                    </View>
                </View>
          </View>
    
            <Text style={StyleSheet.create({textAlign: 'center', fontSize: 11, marginTop: 10})}>Mengetahui :</Text>
    
            <View style={StyleSheet.create({width: '100%', height: 'auto', marginTop: 10, display: 'flex', flexDirection: 'row', gap: 100})}>
                <View style={StyleSheet.create({width: '50%'})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Tanggal :</Text>
                    <Text style={StyleSheet.create({fontSize: 11})}>Reg No: </Text>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center'})}>Kepala Lembaga Kemasyarakatan</Text>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center'})}>Lingkungan {toUpperCaseFirstStr(lingkunganLembaga)}</Text>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center', marginTop: 75, textDecoration: 'underline', fontWeight: 'bold'})}>{kepalaLembaga.toUpperCase()}</Text>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center', fontWeight: 'bold'})}>{nipLembaga === '' ? '' : `NIP. ${nipLembaga}`}</Text>
                    
                </View>
                <View style={StyleSheet.create({width: '50%'})}>
                    <Text style={StyleSheet.create({fontSize: 11})}>Tanggal :</Text>
                    <Text style={StyleSheet.create({fontSize: 11})}>Reg No: </Text>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center'})}>a.n Camat Mataram</Text>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center'})}>{toUpperCaseFirstStr(role)}</Text>
                    <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', gap: 1})}>
                        <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center', marginTop: 75, textDecoration: 'underline', fontWeight: 'bold'})}>{namaTtd.toUpperCase()}</Text>
                        <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center', fontWeight: 'bold'})}>{toUpperCaseFirstStr(golongan)}</Text>
                        <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center'})}>NIP. {nip}</Text>
                    </View>
    
                </View>
            </View>
            {
              namaCamat !== '' 
              ? 
            <View style={StyleSheet.create({width: '100%', height: 'auto', marginTop: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 100})}>
                <View style={StyleSheet.create({width: '50%'})}>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center'})}>CAMAT MATARAM</Text>
                    <Text style={StyleSheet.create({fontSize: 11, textAlign: 'center', marginTop: 75, textDecoration: 'underline', fontWeight: 'bold'})}>{namaCamat.toUpperCase()}</Text>
                </View>
            </View>
            :
            ''
            }
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
      <h1 className='mb-5 mt-5' style={{fontSize: '20px', color: 'white', fontWeight: 'bold', borderRadius: '10px', textAlign: 'center'}}><span><i style={{position: 'absolute', marginTop: '3px', marginLeft: '-30px'}}><CIcon icon={cilNotes}/></i></span> SURAT KETERANGAN AHLI WARIS</h1>

      {/* PEWARIS */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>NOMOR SURAT & PEWARIS</h1>
        <label className="label has-text-black">Nomor Surat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="OPSIONAL" onChange={(e) => {setNomorSuratIndex(e.target.value)}}/>
            </div>
            <p className="help has-text-black">Masukkan nomor surat</p>
        </div>
        <label className="label has-text-black">Nama Pewaris</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setNamaPewaris(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama pewaris</p>
        </div>
        <label className="label has-text-black">Jumlah Ahli Waris</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="" value={jumlahOrang} onChange={handleJumlahOrangChange} min="1" required/>
            </div>
            <p className="help has-text-black">Masukkan jumlah orang yang diwarisi</p>
        </div>
      </div>  

      {/* DATA DIRI */}
      {dataDiri.map((data, index) => (
        <div key={index} className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
            <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>DATA DIRI AHLI WARIS {index + 1}</h1>
            <label className="label has-text-black">Nama</label>
            <div className="field">
                <div className="control">
                    <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" name="nama" value={data.nama || ''} onChange={(e) => {handleChange(index, e)}} required/>
                </div>
                <p className="help has-text-black">Masukkan nama anda</p>
            </div>
            <label className="label has-text-black">NIK</label>
            <div className="field">
                <div className="control">
                    <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="" name="nik" value={data.nik || ''} onChange={(e) => {handleChange(index, e)}} required/>
                </div>
                <p className="help has-text-black">Contoh: 5324XXXXXXXXXXX</p>
            </div>
            <label className="label has-text-black">Tempat/Tanggal Lahir</label>
            <div className="field">
                <div className="control">
                    <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" name="ttl" value={data.ttl || ''} onChange={(e) => {handleChange(index, e)}} required/>
                </div>
                <p className="help has-text-black">Contoh: Mataram, 01 Januari 2002</p>
            </div>
            <label className="label has-text-black">Jenis Kelamin</label>
            <div className="field">
                <div className="control select is-fullwidth">
                    <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" name="jk" value={data.jk || ''} onChange={(e) => {handleChange(index, e)}} required>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <p className="help has-text-black">Pilih Kelamin</p>
            </div>
            <label className="label has-text-black">Agama</label>
            <div className="field">
                <div className="control select is-fullwidth">
                    <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" name="agama" value={data.agama || ''} onChange={(e) => {handleChange(index, e)}} required>
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
                    <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" name="pekerjaan" value={data.pekerjaan || ''} onChange={(e) => {handleChange(index, e)}} required/>
                </div>
                <p className="help has-text-black">Masukkan pekerjaan anda</p>
            </div>
            <label className="label has-text-black">Hubungan Waris</label>
            <div className="field">
                <div className="control">
                    <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" name="hubunganWaris" value={data.hubunganWaris || ''} onChange={(e) => {handleChange(index, e)}} required/>
                </div>
                <p className="help has-text-black">Contoh: Anak Kandung</p>
            </div>
            <label className="label has-text-black">Alamat</label>
            <div className="field">
                <div className="control">
                    <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" name="alamat" value={data.alamat || ''} onChange={(e) => {handleChange(index, e)}} required/>
                </div>
                <p className="help has-text-black">Masukkan alamat</p>
            </div>
        </div>
      ))}

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
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>YANG MENGETAHUI (KEPALA LEMBAGA KEMASYARAKATAN)</h1>
        <label className="label has-text-black">Nama Kepala Lembaga</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setKepalaLembaga(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama kepala lembaga</p>
        </div>
        <label className="label has-text-black">Lingkungan</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setLingkunganLembaga(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan nama lingkungan lembaga</p>
        </div>
        <label className="label has-text-black">NIP</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="number" placeholder="OPSIONAL" onChange={(e) => {setNipLembaga(e.target.value)}}/>
            </div>
            <p className="help has-text-black">Contoh: 1928xxxxxxxxx</p>
        </div>
      </div>

      {/* YANG MENGETAHUI 2*/}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px', marginTop: '30px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>YANG MENGETAHUI (KELURAHAN)</h1>
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
        <label className="label has-text-black">Nama Camat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="OPSIONAL" onChange={(e) => {setNamaCamat(e.target.value)}}/>
            </div>
            <p className="help has-text-black">Masukkan Nama Camat</p>
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

export default KeteranganAhliWaris