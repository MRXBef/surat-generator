import React from 'react';
import { useState } from 'react';
import '../css/LoginPage.css'
import mataram from '../assets/img/mataram.png'
import CIcon from '@coreui/icons-react';
import {cilUser, cilHttps, cilShieldAlt} from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SpinnerLoader from './SpinnerLoader';
import smendak from '../assets/img/smendak.png'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [authCheck, setAuthCheck] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Login'
        checkIsLoggedIn()
    }, [])

    const checkIsLoggedIn = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASEURL}/login`)
            if(response.status == 200) {
                setIsLoggedIn(true)
                navigate('/dashboard')
            } 
        } catch (error) {
            console.log(error.response.data.msg)
            setIsLoggedIn(false)
        } finally {
            setAuthCheck(false)
        }
    }

    const login = async(e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/login`,{
                email: email,
                password: password
            })
            if(response) {
                navigate('/dashboard')
                setIsLoading(false)
            } 
        } catch (error) {
            setIsLoading(false)
            setMsg(error.response.data.msg)
        }
    }

    if(authCheck){
        return (
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <SpinnerLoader color={'white'} width={'100px'}/>
            </div>
        )
    }

    if(isLoggedIn) {
        return null
    }

  return (
    <div className='my-container'>
        <div className="loginBox">
            <div className="loginLogo">
                <img src={mataram} alt="" />
                <p>KELURAHAN MATARAM TIMUR</p>
            </div>
            <div className="loginForm">
                <i className='shield-login'><CIcon icon={cilShieldAlt}/></i>
                <h1 style={{color: 'black', position: 'absolute', marginTop: '-30px', fontWeight: 'bold'}}>Selamat Datang...</h1>
                <form action="">
                    <div className="field">
                        <label className="label has-text-black">Email</label>
                        <div className="control has-icons-left">
                            <input className="input is-fullwidth has-background-white has-text-black" type="email" placeholder="contoh@email.com" onChange={(e) => setEmail(e.target.value)} required/>
                            <span className="icon is-small is-left">
                                <CIcon icon={cilUser} style={{padding: '7px', color: "hsla( 153deg , 53% , 53% , 1)"}} size="xxl"/>
                            </span>
                        </div>
                        <p className="help has-text-black">Masukkan email</p>
                    </div>  
                    <div className="field">
                        <label className="label has-text-black">Password</label>
                        <div className="control has-icons-left">
                            <input className="input is-fullwidth has-background-white has-text-black" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} required/>
                            <span className="icon is-small is-left">
                                <CIcon icon={cilHttps} style={{padding: '7px', color: "hsla( 153deg , 53% , 53% , 1)"}} size="xxl"/>
                            </span>
                        </div>
                        <p className="help has-text-black">Masukkan password</p>
                    </div>  
                    <div className="field">
                        <div className="control">
                        <button onClick={login} className='button is-fullwidth' style={{height: '50px'}}>
                            {
                                isLoading ? (
                                    <SpinnerLoader color={'white'}/>
                                ) : (
                                    'MASUK'
                                )
                            }
                        </button>
                        </div>
                    </div>
                    <p className='is-center'>
                        {msg}
                    </p>  
                    <div style={{width: '100%', padding: '10px', display: 'flex', justifyContent: 'center'}}>
                            <img src={smendak} style={{borderRadius: '10px', width: '50px'}} alt="" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;
