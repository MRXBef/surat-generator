import React from 'react';
import { useState, useEffect } from 'react';
import '../css/DashboardStyle.css'
import mataram from '../assets/img/mataram.png'
import SideBar from './SideBar';
import CIcon from '@coreui/icons-react';
import {cilOptions, cilPen} from '@coreui/icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import KeteranganUsaha from './KeteranganUsaha';
import KeteranganBelumMenikah from './KeteranganBelumMenikah';
import KeteranganDomisiliUsaha from './KeteranganDomisiliUsaha';
import KeteranganTidakMampu from './KeteranganTidakMampu';
import KeteranganBedaNama from './KeteranganBedaNama';
import KeteranganKematian from './KeteranganKematian';
import KeteranganPrilakuBaik from './KeteranganPrilakuBaik';
import KeteranganAhliWaris from './KeteranganAhliWaris';
import KeteranganCampuran from './KeteranganCampuran';
import KeteranganTanah from './KeteranganTanah';
import KeteranganBbm from './KeteranganBbm';

const Dashboard = () => {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')

    const [activeMenu, setActiveMenu] = useState('1')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [form, setForm] = useState(<KeteranganUsaha/>)

    const navigate = useNavigate()

    useEffect(() => {
        refreshToken()
    }, [])

    const handleMenuClicked = (menu) => {
        switch (menu) {
            case '1':
                    setActiveMenu('1')
                    setForm(<KeteranganUsaha/>)
                break;
            case '2':
                    setActiveMenu('2')
                    setForm(<KeteranganBelumMenikah/>)
                break;
            case '3':
                    setActiveMenu('3')
                    setForm(<KeteranganDomisiliUsaha/>)
                break;
            case '4':
                    setActiveMenu('4')
                    setForm(<KeteranganTidakMampu/>)
                break;
            case '5':
                    setActiveMenu('5')
                    setForm(<KeteranganBedaNama/>)
                break;
            case '6':
                    setActiveMenu('6')
                    setForm(<KeteranganKematian/>)
                break;
            case '7':
                    setActiveMenu('7')
                    setForm(<KeteranganPrilakuBaik/>)
                break;
            case '8':
                    setActiveMenu('8')
                    setForm(<KeteranganAhliWaris/>)
                break;
            case '9':
                    setActiveMenu('9')
                    setForm(<KeteranganCampuran/>)
                break;
            case '10':
                    setActiveMenu('10')
                    setForm(<KeteranganTanah/>)
                break;
            case '11':
                    setActiveMenu('11')
                    setForm(<KeteranganBbm/>)
                break;
            
            default:
                break;
        }
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token')
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setName(decoded.username)
            setExpire(decoded.exp)
        } catch (error) {
            if(error.response){
                navigate('/')
            }
        }
    }


  return (
    <div className='dashboard-container'>
        <SideBar toggleSidebar={toggleSidebar} name={name}/>
        <div className="dashboard-content">
            <div className={`dashboard-menu ${isSidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
                <i style={{position: 'absolute', marginLeft: '-30px', marginTop: '-160px', color: 'black'}}>
                    <CIcon icon={cilOptions} />
                </i>
                <div className={`menu ${activeMenu === '1' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('1')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Keterangan Usaha</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '2' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('2')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Keterangan Belum Menikah</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '3' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('3')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Keterangan Domisili Usaha</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '4' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('4')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Keterangan Tidak Mampu</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '5' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('5')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Pernyataan Beda Nama</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '6' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('6')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Keterangan Kematian</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '7' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('7')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Pengantar Kelakuan Baik</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '8' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('8')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Pernyataan Ahli Waris</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '9' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('9')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Keterangan Campuran</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '10' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('10')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Keterangan Tanah</li>
                    </ul>
                </div>
                <div className={`menu ${activeMenu === '11' ? 'active-menu' : ''}`} onClick={() => handleMenuClicked('11')}>
                    <ul>
                        <i><CIcon icon={cilPen}/></i>
                        <li>Surat Rekomendasi BBM</li>
                    </ul>
                </div>
            </div>
            <div className={`form-content ${isSidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
                {form}
            </div>
        </div>
    </div>
)
}

export default Dashboard;
