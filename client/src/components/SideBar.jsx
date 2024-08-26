import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import '../css/SidebarStyle.css'
import {cilUser, cilPlus, cilAccountLogout, cilNotes, cilGrid, cilArrowThickFromRight, cilArrowThickFromLeft} from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SideBar = ({toggleSidebar, name}) => {
    const [sideBar, setSideBar] = useState('side-bar')
    const [sambutan, setSambutan] = useState('')
    const [surat, setSurat] = useState('Buat Surat')
    const [laporan, setLaporan] = useState('Laporan')
    const [editSurat, setEditSurat] = useState('List Surat')
    const [logout, setLogout] = useState('Keluar')
    const [open, setOpen] = useState('open')
    const [close, setClose] = useState('close-close')
    const [activePage, setActivePage] = useState('/dashboard')

    useEffect(() => {
        setSambutan(name)
        handlePath(location.pathname)
    }, [name, location.pathname])

    const navigate = useNavigate()

    const handleIsOpen = () => {
        toggleSidebar()
        setOpen('close-open')
        setSambutan('')
        setSurat('')
        setEditSurat('')
        setLaporan('')
        setLogout('')
        setSideBar('side-bar-close')
        setClose('close')
    }

    const handleClose = () => {
        toggleSidebar()
        setClose('close-close')
        setSambutan(name)
        setSurat('Buat Surat')
        setEditSurat('List Surat')
        setLaporan('Laporan')
        setLogout('Keluar')
        setSideBar('side-bar')
        setOpen('open')
    }
    const handleLogout = async() => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/logout`)
            if(response) {
                navigate('/')
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    const handlePath = (path) => {
        setActivePage(path);
      };
    
      const handleToLocation = (path) => {
          navigate(path)
      }

  return (
    <div className={sideBar}>
        <i className={open} onClick={handleIsOpen}>
            <CIcon icon={cilArrowThickFromRight}/>
        </i>
        <i className={close} onClick={handleClose}>
            <CIcon icon={cilArrowThickFromLeft}/>
        </i>
        <div className="menuBox" style={{boxShadow: 'none', cursor: 'default', marginBottom: '50px'}}>
            <div>
                <i className='' style={{color: 'green'}}>
                    <CIcon icon={cilUser} />
                </i>
                <p>{sambutan}</p>
            </div>
        </div>

        <div className={`menuBox ${activePage === '/dashboard' ? 'active' : '' }`} onClick={() => handleToLocation('/dashboard')}>
            <div>
                <i>
                    <CIcon icon={cilPlus} />
                </i>
                <p>{surat}</p>
            </div>
        </div>
        <div className={`menuBox ${activePage === '/editsurat' ? 'active' : '' }`} onClick={() => handleToLocation('/editsurat')}>
            <div>
                <i className=''>
                    <CIcon icon={cilNotes} />
                </i>
                <p>{editSurat}</p>
            </div>
        </div>
        <div className={`menuBox ${activePage === '/laporan' ? 'active' : '' }`} onClick={() => handleToLocation('/laporan')}>
            <div>
                <i className=''>
                    <CIcon icon={cilGrid} />
                </i>
                <p>{laporan}</p>
            </div>
        </div>
        <div className="menuBox" style={{height: '0px', borderRadius: 'none', borderTop: '1px solid lightgrey', marginTop: '20px', marginBottom: '20px', cursor: 'default', boxShadow: 'none'}}>

        </div>
        <div className="menuBox" onClick={handleLogout}>
            <div>
                <i className='' style={{color: 'grey'}}>
                    <CIcon icon={cilAccountLogout} />
                </i>
                <p style={{color: 'grey'}}>{logout}</p>
            </div>
        </div>
    </div>
  )
}

export default SideBar
