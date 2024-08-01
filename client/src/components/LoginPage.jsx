import React from 'react';
import { useState } from 'react';
import '../css/LoginPage.css'
import mataram from '../assets/img/mataram.png'
import CIcon from '@coreui/icons-react';
import {cilUser, cilHttps, cilShieldAlt} from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        checkIsLoggedIn()
    }, [])

    const checkIsLoggedIn = async() => {
        try {
            const response = await axios.get('http://localhost:5000/login')
            if(response.status == 200) navigate('/dashboard')
        } catch (error) {
            console.log(error.response)
        }
    }

    const login = async(e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/login',{
                email: email,
                password: password
            })
            if(response) navigate('/dashboard')
        } catch (error) {
            setMsg(error.response.data.msg)
        }
    }

  return (
    <div className='my-container'>
        <div className="loginBox">
            <div className="loginLogo">
                <img src={mataram} alt="" />
                <p>KELURAHAN MATARAM TIMUR</p>
            </div>
            <div className="loginForm">
                <i style={{position: 'absolute', marginLeft: '27%', marginTop: '-4%', color: 'darkorange'}}><CIcon icon={cilShieldAlt}/></i>
                <h1 style={{color: 'black', position: 'absolute', marginTop: '-30px', fontWeight: 'bold', fontSize: '20px'}}>Selamat Datang...</h1>
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
                        <button onClick={login} className='button is-fullwidth'>MASUK</button>
                        </div>
                    </div>
                    <p className='is-center'>
                        {msg}
                    </p>  
                </form>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;
