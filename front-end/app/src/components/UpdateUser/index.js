import React, { useRef } from "react"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import AnimatedLetters from '../AnimatedLetters'
import Loader from "react-loaders"
import './index.css'
import { useNavigate } from "react-router-dom";


const UpdateUser = () => {

    const navigate = useNavigate();

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
                navigate("../Login");
            })
            .catch(function (error) {
                alert("An Error occurred when updating user details.")
            });
    }

    const handleUpdate = (event) => {
        
        event.preventDefault();
        
        if (password === confirmpassword){
            console.log("mygod");
            getUpdate();
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

    return(
        <>
        <div className='update'>
            <h1>
                <AnimatedLetters letterClass={letterClass} strArray={['N','o','t','i','f','y']} 
                    idx={15}
                />
            </h1>
            <div className='update-form'>
                <form method="post">
                    <div className="fname-updateform">
                        <input type="text" name="text" ref={fname} placeholder="First Name" required/>
                    </div>
                    <div className="lname-updateform">
                        <input type="text" name="text" ref={lname} placeholder="Last Name" required/>
                    </div>
                    <div className="password-updateform">
                        <input type="password" name="password" ref={password} placeholder="Change Password" required/>
                    </div>
                    <div className="confirm-password-updateform">
                        <input type="password" name="confirm-password" ref={confirmpassword} placeholder="Confirm Password" required/>
                    </div>
                    <div className="dob-updateform">
                        <input type="date" name="date" ref={dob} placeholder="Date Of Birth" required/>
                    </div>
                    <div className="mobile-updateform">
                        <input type="text" name="text" ref={mobile} placeholder="Mobile Number" />
                    </div>

                    <div className="button-login">
                        <button className="button" onClick={handleUpdate}>Update Details</button>
                    </div>
                </form>
             </div>
        </div>

        <Loader type="line-scale" />
        </>
    )
}

export default UpdateUser