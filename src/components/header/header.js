import React from 'react';
import './header.css'

function Header(props) {
    return (
        <div style={styles.divMain}>
            <div style={styles.divTitle}>
                <span className="navtitle">
                    <a href="/">
                        Food Eazy
                        <i className="fas fa-utensils" aria-hidden="true" style={{padding:'0 0 0 6px'}}></i>
                    </a>
                </span>
            </div>
            <div style={styles.divContact}>
                <span className="navcontact">
                    <a href="/">
                        Home
                    </a>
                </span>
                <span className="navcontact">
                    <a href="/">
                        Contact Us
                    </a>
                </span>
            </div>
        </div>
    );
}

const styles={
    divMain:{
        background:'#007bfa',
        position:'sticky',
        top:'0px',
        display:'flex',
        justifyContent:'space-between',
        fontFamily:'Mulish',
        zIndex:1000
    },
    divTitle:{
        color:'#ffffff',
        padding:'.8rem 0rem .8rem 2rem',
        display:'inline-block',
        fontSize:20,
        alignSlef:'center'
    },
    divContact:{
        color:'#ffffff',
        padding:'0rem .7rem',
        display:'inline-block',
        alignSelf:'center',
        fontSize:16,
    }
}

export default Header;