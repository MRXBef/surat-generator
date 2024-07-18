import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilNotes, cilTask, cilX} from '@coreui/icons'
import { useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import mataram from '../assets/img/mataram.png'
import '../css/carry.css'
import { useEffect } from 'react';

const KeteranganAhliWaris = () => {
  // data diri
  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [ttl, setTtl] = useState('')
  const [jk, setJk] = useState('Laki-Laki')
  const [agama, setAgama] = useState('Islam')
  const [pekerjaan, setPekerjaan] = useState('')
  // tujuan
  const [keperluan, setKeperluan] = useState('')
  // saksi
  const [saksi1, setSaksi1] = useState('')
  const [saksi2, setSaksi2] = useState('')
  // yang mengetahui
  const [kepalaLembaga,  setKepalaLembaga] = useState('')
  const [lingkunganLembaga,  setLingkunganLembaga] = useState('')
  const [nipLembaga,  setNipLembaga] = useState('')
  
  const [role,  setRole] = useState('Kepala Lurah')
  const [namaTtd, setNamaTtd] = useState('')
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
 
  const createPdf = () => {
    // Generate PDF content here
    const pdfContent = (
        <Document>
        <Page style={{padding: '50px'}}>
          <Text style={StyleSheet.create({textAlign: 'center', textDecoration: 'underline'})}>SURAT PERNYATAAN AHLI WARIS</Text>
          <Text style={StyleSheet.create({marginTop: 30, fontSize: 12, textIndent: 50})}>Yang bertanda tangan di bawah ini kami para Ahli Waris dari Almarhumah ANAK AGUNG AYU MURTI menyatakan dengan sebenarnya dan sanggup diangkat sumpah bahwa: </Text>
    
            {/* LOOP */}
            <View style={StyleSheet.create({display: 'flex', flexDirection: 'column'})}>
                <View style={StyleSheet.create({marginTop: 20, display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({marginLeft: -100, fontSize: 12, position: 'absolute', width: 200, left: 80})}>1. </Text>
                    <Text style={StyleSheet.create({fontSize: 12})}>Nama</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: Reno Alkatra</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>NIK</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: 5202030107500499</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Jenis Kelamin</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: Laki-Laki</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Tempat/tgl lahir</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: Sengkol, 01-07-1950</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Agama</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: Islam</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Pekerjaan</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: Petani/Kebun</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Hubungan Waris</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: Anak Kandung</Text>
                </View>
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row', marginLeft: 80})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>Alamat</Text>
                    <Text style={StyleSheet.create({marginLeft: 30, fontSize: 12, position: 'absolute', width: 200, left: 80})}>: Jalan Pancasila</Text>
                </View>
            </View>
            {/* ENDLOOP */}
    
          <Text style={StyleSheet.create({fontSize: 12, textIndent: 50, marginTop: 30})}>Memang benar yang tertera di atas merupakan anak kandung dari Almarhumah ANAK AGUNG AYU MURTI yang telah meninggal dunia dan sebagai ahli waris yang sah.</Text>
          <Text style={StyleSheet.create({fontSize: 12, textIndent: 50})}>Surat pernyataan ini diberikan kepada yang bersangkutan dengan untuk keperluan ADMINISTRASI TASPEN dan SURAT INI DIGUNAKAN UNTUK SATU KALI KEPERLUAN. Apabila di kemudian hari keterangan ini tidak benar, maka yang bersangkutan bersedia di tuntut sesuai dengan hukum yang berlaku dan pihak Pejabat maupun Dinas atau Instansi Pemerintah terlepas dari segala tuntutan dan atau gugatan karena ini merupakan tanggung jawab yang bersangkutan selaku ahli waris, selanjutnya untuk diketahui dan di pergunakan sebagaimana mestinya.</Text>
    
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 280, marginTop: 30})}>
            <Text style={StyleSheet.create({fontSize: 12})}>Mataram, 20 Maret 2024</Text>
            <Text style={StyleSheet.create({fontSize: 12, marginBottom: 20})}>Yang membuat pernyataan</Text>
    
            {/* LOOP */}
            <View style= {StyleSheet.create({display: 'flex', flexDirection: 'row', marginBottom: '30px'})}>
              <View style={StyleSheet.create({width: 200, display: "flex", gap: '10px'})} >
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>1. </Text>
                    <View style={StyleSheet.create({width: '100%', height: 'auto'})}>
                        <Text style={StyleSheet.create({fontSize: 12})}>Reno Alkatra</Text>
                    </View>
                </View>
              </View>
              <View style={StyleSheet.create({width: 100, display: "flex", gap: '10px'})} >
                <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                    <Text style={StyleSheet.create({fontSize: 12})}>______________</Text>
                </View>
              </View>
            </View>
            {/* ENDLOOP */}
              
          </View>
          
          <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -300})}>
              <Text style={StyleSheet.create({fontSize: 10})}>Saksi-Saksi :</Text>
                <View style= {StyleSheet.create({display: 'flex', flexDirection: 'row', marginBottom: '30px', marginTop: '20px'})}>
                    <View style={StyleSheet.create({width: 75, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 10})}>1. </Text>
                            <View style={StyleSheet.create({width: '100%', height: 'auto'})}>
                                <Text style={StyleSheet.create({fontSize: 10})}>Raditya</Text>
                            </View>
                        </View>
                    </View>
                    <View style={StyleSheet.create({width: 100, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 10})}>______________</Text>
                        </View>
                    </View>
                </View>
                <View style= {StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                    <View style={StyleSheet.create({width: 75, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 10})}>2. </Text>
                            <View style={StyleSheet.create({width: '100%', height: 'auto'})}>
                                <Text style={StyleSheet.create({fontSize: 10})}>Agusti</Text>
                            </View>
                        </View>
                    </View>
                    <View style={StyleSheet.create({width: 100, display: "flex", gap: '10px'})} >
                        <View style={StyleSheet.create({display: 'flex', flexDirection: 'row'})}>
                            <Text style={StyleSheet.create({fontSize: 10})}>______________</Text>
                        </View>
                    </View>
                </View>
          </View>
    
            <Text style={StyleSheet.create({textAlign: 'center', fontSize: 10, marginTop: 10})}>Mengetahui :</Text>
    
            <View style={StyleSheet.create({width: '100%', height: 'auto', marginTop: 10, display: 'flex', flexDirection: 'row', gap: 100})}>
                <View style={StyleSheet.create({width: '50%'})}>
                    <Text style={StyleSheet.create({fontSize: 10})}>Tanggal :</Text>
                    <Text style={StyleSheet.create({fontSize: 10})}>Reg No: </Text>
                    <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center'})}>Kepala Lembaga Kemasyarakatan</Text>
                    <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center'})}>Lingkungan Karang Sukun</Text>
                    <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center', marginTop: 75, textDecoration: 'underline', fontWeight: 'bold'})}>___________________</Text>
                    
                </View>
                <View style={StyleSheet.create({width: '50%'})}>
                    <Text style={StyleSheet.create({fontSize: 10})}>Tanggal :</Text>
                    <Text style={StyleSheet.create({fontSize: 10})}>Reg No: </Text>
                    <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center'})}>Lurah Mataram Timur</Text>
                    <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center'})}>Kepala Lurah</Text>
                    <View style={StyleSheet.create({display: 'flex', flexDirection: 'column', gap: 10})}>
                        <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center', marginTop: 75, textDecoration: 'underline', fontWeight: 'bold'})}>RYAN HADI UTAMA, S.STP</Text>
                        <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center'})}>NIP. 19931106 201708 1 002 </Text>
                    </View>
    
                </View>
            </View>
    
            <View style={StyleSheet.create({width: '100%', height: 'auto', marginTop: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 100})}>
                <View style={StyleSheet.create({width: '50%'})}>
                    <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center'})}>CAMAT MATARAM</Text>
                    <Text style={StyleSheet.create({fontSize: 10, textAlign: 'center', marginTop: 75, textDecoration: 'underline', fontWeight: 'bold'})}>___________________</Text>
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
      <h1 className='mb-5 mt-5' style={{fontSize: '20px', color: 'white', fontWeight: 'bold', borderRadius: '10px', textAlign: 'center'}}><span><i style={{position: 'absolute', marginTop: '3px', marginLeft: '-30px'}}><CIcon icon={cilNotes}/></i></span> SURAT KETERANGAN AHLI WARIS</h1>

      {/* DATA DIRI */}
      <div className="data-diri" style={{backgroundColor: 'white', padding: '100px', width: '100%', borderRadius: '10px'}}>
        <h1 className='mb-5' style={{fontSize: '20px', color: 'darkorange', fontWeight: 'bold'}}>DATA DIRI</h1>
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
        <label className="label has-text-black">Tempat/Tanggal Lahir</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setTtl(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: Mataram, 01 Januari 2002</p>
        </div>
        <label className="label has-text-black">Jenis Kelamin</label>
        <div className="field">
            <div className="control">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setJk(e.target.value)}} required>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <p className="help has-text-black">Pilih Kelamin</p>
        </div>
        <label className="label has-text-black">Agama</label>
        <div className="field">
            <div className="control">
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
        <label className="label has-text-black">Hubungan Waris</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setPekerjaan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Contoh: Anak Kandung</p>
        </div>
        <label className="label has-text-black">Alamat</label>
        <div className="field">
            <div className="control">
                <input className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setPekerjaan(e.target.value)}} required/>
            </div>
            <p className="help has-text-black">Masukkan alamat</p>
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
            <div className="control">
                <select className="input is-fullwidth has-background-white has-text-black" type="text" placeholder="" onChange={(e) => {setRole(e.target.value)}} required>
                  <option value="Kepala Lurah">Kepala Lurah</option>
                  <option value="Sekretaris">Sekretaris</option>
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
      
      <div className={showPrint === 'hidden' ? 'hidden' : '' } style={{width: "100%", height: '101vh', paddingTop: '10px', paddingLeft: '200px', paddingRight: '200px', backgroundColor: 'black', marginBottom: '50px', position: 'fixed', left: '49.8%', top: '49.8%', transform: 'translate(-50%, -50%)'}} >
        <i style={{position : 'absolute', right: '20px', top : '20px', transform: 'scale(1.2,1.2)', cursor: 'pointer', color: 'white'}} onClick={handleClosePrint}><CIcon icon={cilX} /></i>
        {createPdf()}
      </div>
    </form>
  )
}

export default KeteranganAhliWaris