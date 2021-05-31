import React from 'react'
import Logo from './Logo.gif'

function Header() {

    return (

        <div className='header-container'>
                <a className='logo' href=""><img src={Logo} /></a>
        <div className='left-header'>
        <span>
            <a className='header-title' href="index.html">Hacker News</a>
        </span>
          <span>new</span>
          <span>past</span>
          <span>comment</span>
          <span>ask</span>
          <span>show</span>
          <span>job</span>
          <span>submit</span>
        </div>
        <div className='right-header'>
            <span>login</span>
        </div>
 
        </div>

    )
}

export default Header;
