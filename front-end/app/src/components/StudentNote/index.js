import Loader from "react-loaders"
import Navbar from "../Navbar"
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import "./index.css";


const StudentNote = () => {

    const [noteList, setNotes] = useState("");

    // const notess = ()=>{
    //     const nnoo="Hello";
    //     setNotes(nnoo);
    // };

    // useEffect(() => {
    //     notess();}, [setNotes]);

    return (
        <>
            <Navbar />

            <div className="Home">
            <h1 className="HomeNotes">Notes</h1>

            <Link to="/create">
                <button className="AddBtn">+</button>
            </Link>

            {!noteList ||
                (noteList.length == 0 && (
                    <h2 className="NoNotesFound">No Notes Found</h2>
                ))}
            <div className="NoteList">
                {noteList && (
                    <div>
                        {" "}
                        {noteList.map((note) => (
                            <div className="Note">
                                <div className="NoteContent">
                                    {note.content}
                                </div>
                                <Link to={`/deletetask/${note._id}`}>
                                    <span className="DelIcon">
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </span>
                                </Link>
                            </div>
                        ))}{" "}
                    </div>
                )}
            </div>
        </div>
        < Loader type = "line-scale" />
    </>
    )
}

export default StudentNote