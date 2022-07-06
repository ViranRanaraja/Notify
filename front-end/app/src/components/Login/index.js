import React, { useRef } from "react"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import AnimatedLetters from '../AnimatedLetters'
import './index.css'

const Login = () => {

    const [account, setaccount] = useState("Student")

    const handleChange = (event) => {
        setaccount(event.target.value)
    }

    const handleLogin = (event) =>{
        event.preventDefault();
        if(account === "Admin"){
            getAdminLogin();
        }
        else if(account === "Student"){
            getStudentLogin();
        }
        else{
            alert("An unexpected error has occurred.")
        }
    }

    const email = useRef(null);
    const password = useRef(null);

    function getAdminLogin(){
        var axios = require('axios');
        var data = JSON.stringify({
            "email": email?.current?.value,
            "password": password?.current?.value,
            "accountType": "Admin"
        });

        var config = {
        method: 'post',
        url: 'http://localhost:8080/user/adminLogin',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function () {
            <Link exact='true' to='/userList'></Link>
        })
        .catch(function (response) {
            // if(response.data.message === "User not found in Database."){
            //     alert("An account for this email has not been created. Please contact the IT department.")
            // }
            // if(response.data.message === "User not found."){
            //     alert("Check the Account Type Again. Please contact the IT department if the Account Type is Incorrect.")
            // }
        });
    }

    function getStudentLogin(){
        var axios = require('axios');
        var data = JSON.stringify({
            "email": email?.current?.value,
            "password": password?.current?.value,
            "accountType": "Student"
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8080/user/studentLogin',
            headers: { 
                'Content-Type': 'application/json'
        },
            data : data
        };

        axios(config)
        .then(function () {
            <Link exact='true' to='/studentNote'></Link>
        })
        .catch(function (response) {
            // if(response.data.message === "User not found in Database."){
            //     alert("An account for this email has not been created. Please contact the IT department.")
            // }
            // if(response.data.message === "User not found."){
            //     alert("Check the Account Type Again. Please contact the IT department if the Account Type is Incorrect.")
            // }
        });

    }

    const [letterClass, setLetterClass] = useState('text-animate')
    
    useEffect(() => {
        setTimeout(() => {
          setLetterClass('text-animate-hover')
        }, 3000)
      }, []);

    return(
        <div className='login' onSubmit={handleLogin}>
            <h1>
                <AnimatedLetters letterClass={letterClass} strArray={['N','o','t','i','f','y']} 
                    idx={15}
                />
            </h1>
            <div className='login-form'>
                <form method="post">
                    <div className="email-loginform">
                        <input type="text" name="email" ref={email} placeholder="Email" required/>
                    </div>
                    <div className="password-loginform">
                        <input type="password" name="password" ref={password} placeholder="Password" required/>
                    </div>
                    <div className="drop-down-loginform">
                        <select value={account} onChange={handleChange}>
                            <option value="Admin">Admin</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <div className="button-login">
                        <button className="button" onClick={handleLogin}>Login</button>
                    </div>
                </form>
             </div>
        </div>
    )

}

export default Login