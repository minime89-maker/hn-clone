import React from 'react'

function Footer({ onChange, onSubmit, search }) {


    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <span>
                    <a href='https://news.ycombinator.com/newsguidelines.html'>Guidelines</a>
                    <a href='https://news.ycombinator.com/newsfaq.html'>FAQ</a>
                    <a href='https://news.ycombinator.com/lists'>Lists</a>
                    <a href='https://github.com/HackerNews/API'>API</a>
                    <a href='https://news.ycombinator.com/security.html'>Security</a>
                    <a href='https://www.ycombinator.com/legal/'>Legal</a>
                    <a href='https://www.ycombinator.com/apply/'>Apply to YC</a>
                    <a href='mailto:hn@ycombinator.de'>Contact</a>
                </span>
            </div>
            <div className='footer-search'>
                <form onSubmit={onSubmit}>
                    <label>Search: </label>
                    <input type="text" onChange={onChange} value={search}></input>
                </form>
            </div>
        </div>
    )
}

export default Footer
