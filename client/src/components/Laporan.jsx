import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import CIcon from '@coreui/icons-react';
import { cilLink } from '@coreui/icons';
import XLSX from 'xlsx/dist/xlsx.full.min.js';
import FileSaver from 'file-saver';
import '../css/LaporanStyle.css';

const Laporan = () => {
    const [name, setName] = useState('');
    const [expire, setExpire] = useState('');
    const [token, setToken] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const tahunSekarang = new Date().getFullYear();
    const [tahun, setTahun] = useState(tahunSekarang);
    const [dataPerBulan, setDataPerBulan] = useState({});
    const [totalPerBulan, setTotalPerBulan] = useState({});
    const [totalTahunan, setTotalTahunan] = useState(0);

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASEURL}/token`);
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.username);
            setExpire(decoded.exp);
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Handle error here, e.g., redirect to login page
        }
    };

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get(`${import.meta.env.VITE_BASEURL}/token`);
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    useEffect(() => {
        fetchData();
    }, [tahun]);

    const fetchData = async () => {
        try {
            const response = await axiosJWT.get(`${import.meta.env.VITE_BASEURL}/laporan/${tahun}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDataPerBulan(response.data);
            calculateTotals(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotals = (data) => {
        const totals = {
            Januari: 0,
            Februari: 0,
            Maret: 0,
            April: 0,
            Mei: 0,
            Juni: 0,
            Juli: 0,
            Agustus: 0,
            September: 0,
            Oktober: 0,
            November: 0,
            Desember: 0
        };

        let yearlyTotal = 0;

        Object.values(data).forEach((bulanData) => {
            Object.keys(totals).forEach((bulan) => {
                const jumlah = bulanData[bulan] || 0;
                totals[bulan] += jumlah;
                yearlyTotal += jumlah;
            });
        });

        setTotalPerBulan(totals);
        setTotalTahunan(yearlyTotal);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(Object.keys(dataPerBulan).map(bulan => ({
            'Jenis Surat': bulan,
            'Januari': dataPerBulan[bulan]['Januari'] || 0,
            'Februari': dataPerBulan[bulan]['Februari'] || 0,
            'Maret': dataPerBulan[bulan]['Maret'] || 0,
            'April': dataPerBulan[bulan]['April'] || 0,
            'Mei': dataPerBulan[bulan]['Mei'] || 0,
            'Juni': dataPerBulan[bulan]['Juni'] || 0,
            'Juli': dataPerBulan[bulan]['Juli'] || 0,
            'Agustus': dataPerBulan[bulan]['Agustus'] || 0,
            'September': dataPerBulan[bulan]['September'] || 0,
            'Oktober': dataPerBulan[bulan]['Oktober'] || 0,
            'November': dataPerBulan[bulan]['November'] || 0,
            'Desember': dataPerBulan[bulan]['Desember'] || 0
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, worksheet, 'Data Laporan');

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        FileSaver.saveAs(excelBlob, 'laporan.xlsx');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='laporan-container'>
            <SideBar toggleSidebar={toggleSidebar} name={name} />
            <div className="laporan-content">
                <div className={`laporan-menu ${isSidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
                    <div className="pilih-waktu">
                        <i style={{ position: 'absolute', right: '100px', transform: 'scale(1.5,1.5)', color: 'black' }}><CIcon icon={cilLink} />{tahun}</i>
                        <form onSubmit={(e) => { e.preventDefault(); fetchData(); }} style={{ display: 'flex', gap: '20px' }}>
                            <div className="control select" style={{ width: '200px' }}>
                                <select
                                    className="input is-fullwidth has-background-white has-text-black"
                                    type="text"
                                    placeholder=""
                                    value={tahun}
                                    onChange={(e) => { setTahun(e.target.value); }}
                                >
                                    <option value={tahunSekarang}>Tahun saat ini ({tahunSekarang})</option>
                                    <option value={tahunSekarang - 1}>{tahunSekarang - 1}</option>
                                    <option value={tahunSekarang - 2}>{tahunSekarang - 2}</option>
                                    <option value={tahunSekarang - 3}>{tahunSekarang - 3}</option>
                                    <option value={tahunSekarang - 4}>{tahunSekarang - 4}</option>
                                    <option value={tahunSekarang - 5}>{tahunSekarang - 5}</option>
                                    <option value={tahunSekarang - 6}>{tahunSekarang - 6}</option>
                                    <option value={tahunSekarang - 7}>{tahunSekarang - 7}</option>
                                    <option value={tahunSekarang - 8}>{tahunSekarang - 8}</option>
                                    <option value={tahunSekarang - 9}>{tahunSekarang - 9}</option>
                                </select>
                                <p className='help has-text-black'>Masukkan berdasarkan tahun</p>
                            </div>
                            <div className="export-button-container">
                                <button className="button is-primary" onClick={exportToExcel}>Export to Excel</button>
                            </div>
                        </form>
                    </div>
                    <div className="table-container">
                    <div className="total-tahunan" style={{ fontWeight: 'bold', fontSize: '15px', color: 'black', textAlign: 'center' }}>
                        Total Tahunan: ({totalTahunan})
                    </div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Jenis Surat</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Januari</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Februari</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Maret</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>April</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Mei</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Juni</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Juli</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Agustus</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>September</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Oktober</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>November</th>
                                    <th style={{ color: 'black', textAlign: 'center', lineHeight: '60px' }}>Desember</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(dataPerBulan).map((bulan, index) => (
                                    <tr key={index}>
                                        <td style={{ color: 'black', textAlign: 'center', width: '200px' }}>{bulan}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Januari'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Februari'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Maret'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['April'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Mei'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Juni'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Juli'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Agustus'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['September'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Oktober'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['November'] || 0}</td>
                                        <td style={{ color: 'black', textAlign: 'center', width: '90px', lineHeight: '50px' }}>{dataPerBulan[bulan]['Desember'] || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Laporan;
