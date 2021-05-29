import React from 'react'

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <span>
                    <a>Guidelines</a>
                    <a>FAQ</a>
                    <a>Lists</a>
                    <a>API</a>
                    <a>Security</a>
                    <a>Legal</a>
                    <a>Apply to YC</a>
                    <a>Contact</a>
                </span>
            </div>
            <div className='footer-search'>
                <form>
                    <label>Search</label>
                    <input type="text" placeholder='search ...'></input>
                </form>
            </div>
        </div>
    )
}

export default Footer
