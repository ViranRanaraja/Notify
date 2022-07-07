import "./index.css";
import Navbar from '../Navbar'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const UserList = () => {

    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');

    const handleSearchNote = (event) =>{
        setSearchText(event.target.value);
    }

    const handleUser = () => {
        navigate("../CreateUser")
    }

    return(
        <>
        <Navbar />
        <div className="search-bar">
            <div className='search'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' size='1.3em' />
                <input onChange={handleSearchNote} type='text' placeholder='Type To Search...'/>
            </div>
            <div className="hover-btn">
                <button className="user-add-btn" onClick={handleUser} >
                    <FontAwesomeIcon className="UserIcon" icon={faUserPlus} />
                </button>
            </div>
        </div>
        
        </>
    )
}

export default UserList