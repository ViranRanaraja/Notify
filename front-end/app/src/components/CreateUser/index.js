import React, { useRef } from "react"
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import validator from 'validator';
import './index.css';


const CreateUser = () => {

    const navigate = useNavigate();

    const [account, setaccount] = useState('');

    const fname = useRef(null);
    const lname = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleChange = (event) => {
        setaccount(event.target.value)
    }

    const handleCreate = (event) => {
        event.preventDefault();
        var axios = require('axios');
        var data = JSON.stringify({
            "firstName": fname?.current?.value,
            "lastName": lname?.current?.value,
            "email": email?.current?.value,
            "password": password?.current?.value,
            "accountType": account,
        });

        var config = {
        method: 'post',
        url: 'http://localhost:8080/user/adminCreate',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function () {
            alert("Account Successfully Created");
            navigate("../")
        })
        .catch(function (error) {
            console.log(error);
        });
        event.target.reset();
        setEmailError('');
    }

    const handleBack = () => {
        navigate("../UserList");
    }

    const [emailError, setEmailError] = useState('')

    const validateEmail = (error) => {
        var email = error.target.value
      
        if (validator.isEmail(email)) {
          setEmailError('Email is Valid!')
        } else {
          setEmailError('Email is not Valid! Enter valid Email.')
        }
      }

    const [letterClass, setLetterClass] = useState('text-animate')
    
    useEffect(() => {
        setTimeout(() => {
          setLetterClass('text-animate-hover')
        }, 3000)
    }, []);

    const [passwordShown, setPasswordShown] = useState(false);
    
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return(
        <div className='create'>
            <h1>
                <AnimatedLetters letterClass={letterClass} strArray={['N','o','t','i','f','y']} 
                    idx={15}
                />
            </h1>
            <div className="goback-btn">
                <button className="go-back-btn" onClick={handleBack} >
                    <FontAwesomeIcon className="BackIcon" icon={faArrowLeft} />
                </button>
            </div>
            <div className='create-form'>
                <form method="post" onSubmit={handleCreate}>
                    <div className="fname-createform">
                        <input type="text" name="fname" ref={fname} placeholder="First Name" />
                    </div>
                    <div className="lname-createform">
                        <input type="text" name="lname" ref={lname} placeholder="Last Name" />
                    </div>
                    <div className="email-createform">
                        <input type="email" name="email" ref={email} onChange={(error) => validateEmail(error)} placeholder="Email" required/>
                        <div className="validate-error">
                            {emailError}
                        </div>
                    </div>
                    <div className="password-createform">
                        <input type={passwordShown ? "text" : "password"} name="password" ref={password} placeholder="Password" required/>
                        <button onClick={togglePassword} className="password"><FontAwesomeIcon className="showIcon" icon={faEye}/></button>
                    </div>
                    <div className="drop-down-createform">
                        <select value={account} onChange={handleChange}>
                            <option value="Admin">Admin</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <div className="button-create">
                        <button className="button" /*onClick={handleEmail}*/ >Send Email</button>
                    </div>
                </form>
             </div>
        </div>
    )
}

export default CreateUser