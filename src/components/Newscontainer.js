import moment from 'moment'
import React from 'react'

function Newscontainer({ key, title, url, points, author, time, comments }) {
    return (
        <div className='news-container'>
            <div className='news-wrapper' key={key}>
                <div className='news-title'>
                    <a href={title}>{title}</a>
                    <a className='news-title-url' href={url}>{url}</a>
                </div>
                <div className='news-info'>
                    <span className='points'>{points} points</span>
                    <span className='author'>by {author}</span>
                    <span className='time'> {moment(time).fromNow()} |</span>
                    <span> hide |</span>
                    <span className='comments'> {comments} comments</span>
                </div>
            </div>           
        </div>
    )
}

export default Newscontainer
