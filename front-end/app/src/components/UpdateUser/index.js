import React, { useRef } from "react"
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import './index.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const UpdateUser = () => {

    const navigate = useNavigate();

    const [pass, setPass] = useState('');
    const [confirmpass, setConfirmPass] = useState('');

    const fname = useRef(null);
    const lname = useRef(null);
    const password = useRef(null);
    const confirmpassword = useRef(null);
    const dob = useRef(null);
    const mobile = useRef(null);
    const userId = localStorage.getItem('userId') || '';

    function getUpdate(){
        var axios = require('axios');
            var data = JSON.stringify({
                "firstName": fname?.current?.value,
                "lastName": lname?.current?.value,
                "password": confirmpassword?.current?.value,
                "dateOfBirth": dob?.current?.value,
                "mobile": mobile?.current?.value,
            });

            var config = {
            method: 'put',
            url: 'http://localhost:8080/user/editUser?id=' + userId,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios(config)
            .then(function () {
                alert("Details successfully updated.")
                navigate("../");
            })
            .catch(function () {
                alert("An Error occurred when updating user details.")
            });
    }

    const handlepassword = () =>{
        setPass(password);
    };

    const handleconfirmpassword = () =>{
        setConfirmPass(confirmpassword);
    };
    
    const handleUpdate = (event) => {
        event.preventDefault();
        
        if (pass.current.value === confirmpass.current.value){
            getUpdate();
            event.target.reset();
        }
        else{
            alert("Password do not match.");
        }
        
    };

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

    const [passwordShown2, setPasswordShown2] = useState(false);
    
    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2);
    }

    return(
        <div className='update'>
            <h1>
                <AnimatedLetters letterClass={letterClass} strArray={['N','o','t','i','f','y']} 
                    idx={15}
                />
            </h1>
            <div className='update-form'>
                <form method="post" onSubmit={handleUpdate}>
                    <div className="fname-updateform">
                        <input type="text" name="text" ref={fname} placeholder="First Name" required/>
                    </div>
                    <div className="lname-updateform">
                        <input type="text" name="text" ref={lname} placeholder="Last Name" required/>
                    </div>
                    <div className="password-updateform">
                    <input type={passwordShown ? "text" : "password"} id="passwordname" ref={password} placeholder="Change Password" onChange={handlepassword} required />
                        <button onClick={togglePassword} className="password"><FontAwesomeIcon className="showIcon" icon={faEye}/></button>
                    </div>
                    <div className="confirm-password-updateform">
                        <input type={passwordShown2 ? "text" : "password"} id="confpassword" ref={confirmpassword} placeholder="Confirm Password" onChange={handleconfirmpassword} required/>
                        <button onClick={togglePassword2} className="password"><FontAwesomeIcon className="showIcon" icon={faEye}/></button>
                    </div>
                    <div className="dob-updateform">
                        <input type="date" name="date" ref={dob} placeholder="Date Of Birth" required/>
                    </div>
                    <div className="mobile-updateform">
                        <input type="text" name="text" ref={mobile} placeholder="Mobile Number" required/>
                    </div>

                    <div className="button-login">
                        <button className="button">Update Details</button>
                    </div>
                </form>
             </div>
        </div>
    )
}

export default UpdateUser