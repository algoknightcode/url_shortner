
import React from "react";
import s from './navbar.module.css';
import Input from "../serch_ui";
import { Link } from "react-router-dom";


const Navbar = () =>{
    return(
        <div className={s.outer}>
            <div className={s.left}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <p style={{ cursor: 'pointer', fontWeight: 700, fontSize: '2rem', letterSpacing: 2, margin: 0 }}>url shortner</p>
              </Link>
            </div>

            <div className={s.middle}>
              <Link to="/statistics" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                Statistics
              </Link>
            </div>

            <div className={s.right}> 
                <Input/>
            </div>
        </div>
    )
}

export default Navbar;