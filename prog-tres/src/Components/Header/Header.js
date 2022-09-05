import React from 'react';
import './header.css';

function Header(props){

    return(
        <nav className='navbar'>
            <div className='logo-home'>
                <img className='logo' src='../../images/logo.png'></img>
                <a>Home</a>
            </div>
            <div className="list-header">
                <a href="">Favoritos</a>
                <a href="">Películas</a>
                <a href="">Ver todos</a>
            </div>
        </nav>
    )
}

export default Header