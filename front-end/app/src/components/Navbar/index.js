import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import './index.css'


const NoteNav = () => {

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
                <button className="profile" /*onClick={handleSignOut}*/>Profile</button>
                
                <button className="sign-out" /*onClick={handleSignOut}*/>Sign Out</button>
            </div>
        </div>
        </>
    )
}

export default NoteNav