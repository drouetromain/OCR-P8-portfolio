import Navigation from '../Navigation'
import React, { useState, useEffect } from 'react';

function Header() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='hp-div hp-nav-block'>
            <div>
                <div className={
                        isOpen ? "hp-display-nav" : "hp-not-displayed-nav"
                    }>
                    <button className='hp-header-btn-burger-menu' onClick={() => {
                        setIsOpen(false);
                        console.log('isOpen:' + isOpen)
                        }} >
                        <span className="material-symbols-outlined hp-header-icon-burger-menu">close</span>
                    </button>
                </div>
                <div className={
                        isOpen ? "hp-not-displayed-nav" : "hp-display-nav"
                    }>
                    <button className='hp-header-btn-burger-menu' onClick={() => {
                        setIsOpen(true);
                        console.log('isOpen:' + isOpen)
                        }} >
                        <span className="material-symbols-outlined hp-header-icon-burger-menu">menu</span>
                    </button>
                </div>
                
                
                <div className={
                        isOpen ? "hp-display-nav" : "hp-not-displayed-nav"
                    }>
                    <Navigation />
                </div>
                
            </div>
                
            </div>
        
    )
}

export default Header