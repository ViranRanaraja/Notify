import "./index.css";
import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const UserList = () => {

    const navigate = useNavigate();

    const [userList, setUser] = useState([]);

    const getList = () => {
        var axios = require('axios');

        var config = {
        method: 'get',
        url: 'http://localhost:8080/user/userListAll',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            setUser(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    };

    useEffect(() =>{
        getList();}, [] 
    );

    useEffect(() =>{
        getList();}, [setUser] 
    );

    const [searchText, setSearchText] = useState("");

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
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                <input onChange={handleSearchNote} type='text' value={searchText} placeholder='Type First Name of User To Search for User in List'/>
            </div>
            <div className="hover-btn">
                <button className="user-add-btn" onClick={handleUser} >
                    <FontAwesomeIcon className="UserIcon" icon={faUserPlus} />
                </button>
            </div>
        </div>
        <div className="Users">
            <h1 className="UsersTitle">User List</h1>

            {!userList ||
                (userList.length == 0 && (
                    <h2 className="NoUserFound">No Users Found in Database</h2>
                ))}
            <div className="Userslist">
                {userList && (
                    <div>
                        {" "}
                        {userList.map((user) => (
                            <div className="User">
                                <div className="UserContent">
                                    <p>Full Name: {user.firstName} {user.lastName}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Account Type: {user.accountType}</p> 
                                </div>
                            </div>
                        ))}{" "}
                    </div>
                )}
            </div>
        </div>
        
        </>
    )
}

export default UserList