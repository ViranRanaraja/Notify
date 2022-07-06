import React, { useRef } from "react"
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { useNavigate } from "react-router-dom";
import './index.css'

const Login = () => {

    const navigate = useNavigate();

    const [account, setaccount] = useState("Student")

    const handleChange = (event) => {
        setaccount(event.target.value)
    }

    const email = useRef(null);
    const password = useRef(null);
    var attempts;
    var id;

    function getAdminLogin(){
        var axios = require('axios');
        var data = JSON.stringify({
            "email": email?.current?.value,
            "password": password?.current?.value,
            "accountType": "Admin",
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
        .then(function (response) {
            id = response.data[0]._id;
            const userId = response.data[0]._id;
            localStorage.setItem("userId", userId)
            attempts = response.data[0].loginattempts;
            if(response.data[0].loginattempts <= 0){
                navigate("../UpdateUser");
                updateAttempt();
            }
            else{
                navigate("../UserList");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("An Error has occurred. Check entered details and Try Again!")
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
        .then(function (response) {
            id = response.data[0]._id;
            const userId = response.data[0]._id;
            localStorage.setItem("userId", userId);
            attempts = response.data[0].loginattempts;
            if(response.data[0].loginattempts <= 0){
                navigate("../UpdateUser");
                updateAttempt();
            }
            else{
                navigate("../StudentNote");
            }
        })
        .catch(function () {
            alert("An Error has occurred. Check entered details and Try Again!")
        });

    }
        
    function updateAttempt(){
        var axios = require('axios');
        var data = JSON.stringify({
            "loginattempts": attempts + 1,
        });

        var config = {
        method: 'put',
        url: 'http://localhost:8080/user/updateAttempts?id=' + id,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function () {
        })
        .catch(function () {
        });

    }
    const handleLogin = (event) =>{
        event.preventDefault();
        if(account === "Admin") {
            getAdminLogin();
        }
        if(account === "Student"){
            getStudentLogin();
        }
    }

    const [letterClass, setLetterClass] = useState('text-animate')
    
    useEffect(() => {
        setTimeout(() => {
          setLetterClass('text-animate-hover')
        }, 3000)
      }, []);

    return(
        <div className='login'>
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