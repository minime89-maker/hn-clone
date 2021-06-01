import React from 'react'

function Footer({ onChange, onSubmit, search }) {


    return (
        <div className='footer-container'>
            <div className='footer-links'>
                    <a href='https://news.ycombinator.com/newsguidelines.html' rel='noreferrer noopener' target='_blank' >Guidelines</a>
                    <a href='https://news.ycombinator.com/newsfaq.html' rel='noreferrer noopener' target='_blank' >FAQ</a>
                    <a href='https://news.ycombinator.com/lists' rel='noreferrer noopener' target='_blank' >Lists</a>
                    <a href='https://github.com/HackerNews/API' rel='noreferrer noopener' target='_blank' >API</a>
                    <a href='https://news.ycombinator.com/security.html' rel='noreferrer noopener' target='_blank' >Security</a>
                    <a href='https://www.ycombinator.com/legal/' rel='noreferrer noopener' target='_blank' >Legal</a>
                    <a href='https://www.ycombinator.com/apply/' rel='noreferrer noopener' target='_blank' >Apply to YC</a>
                    <a href='mailto:hn@ycombinator.de' rel='noreferrer noopener' target='_blank' >Contact</a>
            </div>
            <div className='footer-search'>
            <label>Search: </label>
                <form onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} value={search}></input>
                    {/* <button onClick={(e) => console.log(e)}>submit</button> */}
                </form>
            </div>
        </div>
    )
}

export default Footer
