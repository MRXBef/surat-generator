import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import '../css/EditSuratStyle.css';
import CIcon from '@coreui/icons-react';
import {cilPencil, cilPin} from '@coreui/icons'

const EditSurat = () => {
    const [name, setName] = useState('');
    const [expire, setExpire] = useState('');
    const [token, setToken] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [surat, setSurat] = useState([])

    useEffect(() => {
        refreshToken();
        fetchAllSurat()
    }, []);

    const fetchAllSurat = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/surat', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSurat(response.data.surat)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(surat)

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.username);
            setExpire(decoded.exp);
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    };

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleEditClicked = (id, name) => {
        setHideFormAddStock('')
        setSuratName(name)
    }

    const addstock = () => {

    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const [hideFormAddStock, setHideFormAddStock] = useState('hideFormAddStock')
    const [suratName, setSuratName ] = useState('')

    const handleHideFormAddStock = () => {
        setHideFormAddStock('hideFormAddStock')
      }


    return (
        <div className='edit-container'>
            <SideBar toggleSidebar={toggleSidebar} name={name} />
            <div className="edit-content">
                <div className={`edit-menu ${isSidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
                    <div className="header-menu">
                        <i style={{}}>
                            <CIcon style={{transform: 'scale(1.2,1.2', color: 'black'}} icon={cilPin}/>
                        </i>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>No</th>
                                    <th style={{ color: 'black', lineHeight: '60px', textAlign: 'center' }}>Nama Surat</th>
                                    {/* <th style={{ color: 'black', lineHeight: '60px', textAlign: 'center' }}>Nomor Surat</th>
                                    <th style={{ color: 'black', lineHeight: '60px', textAlign: 'center' }}>Ganti</th> */}
                                </tr>
                            </thead>
                            {surat.map((key, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td style={{ color: 'black', textAlign: 'center', width: '10px', lineHeight: '60px', fontWeight: 'bold' }}>{index + 1}</td>
                                    <td style={{ color: 'black', textAlign: 'center', width: '200px', lineHeight: '60px' }}>{key.nama_surat.toUpperCase() || "-"}</td>
                                    {/* <td style={{ color: 'black', textAlign: 'center', width: '200px', lineHeight: '60px' }}>{key.nomor_surat || "-"}</td>
                                    <td style={{ color: 'black', textAlign: 'center', width: '10px', lineHeight: '60px' }}><button className='button' style={{ marginTop : '10px', backgroundColor: 'darkorange', outline: 'none', border: 'none' }} onClick={() => handleEditClicked(key.id, key.nama_surat)}><CIcon icon={cilPencil}/></button></td> */}
                                </tr>
                            </tbody>
                            ))}
                        </table>
                    </div>
                    <div onClick={handleHideFormAddStock}  className={`formAddStock ${hideFormAddStock}`}>
                        <form style={{backgroundColor: 'white'}} onSubmit={addstock} onClick={stopPropagation} action="">
                        <div className="label stockNameInfo"></div>
                            <div className="field">
                            <div style={{color: 'black'}} className="label">{suratName.toUpperCase()}</div>
                            <div className="control is-flex has-icons-left">
                                <input type="hidden" className='input'/>
                                <input type="text" className='input'/>
                                <span className='icon is-left is-small'><CIcon icon={{cilPencil}}/></span>
                                <button className='button ml-3 is-primary'>Ubah</button>
                            </div>
                            </div>
                        </form>
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default EditSurat;
