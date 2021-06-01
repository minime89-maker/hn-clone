import React from 'react'
import Logo from './Logo.gif'

function Header() {

    return (

        <div className='header-container'>

            <div className='left-header'>
                <a className='logo' href=""><img src={Logo} alt='Logo'/></a>
                <div className='links-wrapper'>
                    <a className='header-title' href="index.html">Hacker News</a>
                    <div className='title-wrapper'>
                        <a href='https://news.ycombinator.com/newest' rel='noreferrer noopener' target='_blank' >new</a>
                        <a href='https://news.ycombinator.com/front' rel='noreferrer noopener' target='_blank' >past</a>
                        <a href='https://news.ycombinator.com/newcomments' rel='noreferrer noopener' target='_blank' >comment</a>
                        <a href='https://news.ycombinator.com/ask' rel='noreferrer noopener' target='_blank' >ask</a>
                        <a href='https://news.ycombinator.com/show' rel='noreferrer noopener' target='_blank' >show</a>
                        <a href='https://news.ycombinator.com/jobs' rel='noreferrer noopener' target='_blank' >jobs</a>
                        <a href='https://news.ycombinator.com/submit' rel='noreferrer noopener' target='_blank' >submit</a>
                    </div>

                </div>
            </div>
            <div className='right-header'>
                <span>login</span>
            </div>

        </div>

    )
}

export default Header;
