import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const StudentNote = () => {

    const [noteList, setNotes] = useState([]);

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
                                    {note.title}
                                <div className="NoteContent">
                                    {note.content}
                                </div>
                                <Link to={`/deletetask/${note._id}`}>
                                    <span className="DelIcon">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </span>
                                </Link>
                            </div>
                        ))}{" "}
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default StudentNote;