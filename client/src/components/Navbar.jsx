import React from 'react';

const Navbar = () =>{

    return (
        <nav className='nav'>
            <a href='/' className='site-title'>Job Tracker</a>
            <ul>
                <li className='ative'>
                    <a href='/dashboard'>Dashboard</a>
                </li>
                <li>
                    <a href='/application'>Application</a>
                </li>
                <li>
                    <a href='/'>Login</a>
                </li>
                {/* <li>
                    <a href='/logout'>Logout</a>
                </li> */}
            </ul>
        </nav>
    )
}

export default Navbar;