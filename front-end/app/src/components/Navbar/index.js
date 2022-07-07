import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLetters from '../AnimatedLetters';
import './index.css';

const NoteNav = () => {

    const userId = localStorage.getItem('userId') || '';
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        const deleteprofile = window.confirm("Are you sure you want to delete your account?");
        if (deleteprofile){
            var axios = require('axios');

            var config = {
            method: 'delete',
            url: 'localhost:8080/user/deleteUser?id=' + userId,
            headers: { }
            };

            axios(config)
            .then(function (response) {
                navigate("../Login");
            })
            .catch(function (error) {
            console.log(error);
            });

        }
        else{
            alert("Account Deletion Cancelled.");
        }
    }

    const handleSignOut = (event) => {
        alert("Not Working Yet.");
    }
    const [letterClass, setLetterClass] = useState('text-animate')
    
    useEffect(() => {
        setTimeout(() => {
          setLetterClass('text-animate-hover')
        }, 3000)
      }, []);

    return(
        <>
        <div className="nav-bar">
            <div className="nav-title">
                <h1>
                <AnimatedLetters letterClass={letterClass} strArray={['N','o','t','i','f','y']} 
                    idx={15}
                />
                </h1>
            </div>
            <div className="nav-button">
                <button className="delete" onClick={handleDelete}>Delete Account</button>

                <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
        </>
    )
}

export default NoteNav