import moment from 'moment'
import React from 'react'

function Comments({ key, title, url, points, author, time, comments }) {
    return (
        <div className='news-container'>
            <div className='news-wrapper' key={key}>
                <div className='news-title'>
                    <a href={title}>{title}</a>s
                    <span>
                        <a className='news-title-url' href={url}>{url}</a>
                    </span>
                </div>
                <div className='news-info'>
                    <span className='points'>{points} points |</span>
                    &nbsp;
                    <span className='author'>by {author} |</span>
                    &nbsp;
                    <span className='time'>{moment(time).fromNow()} |</span>
                    <span> hide |</span>
                    &nbsp;
                    <span className='comments-button' href='#'>comments</span>
                </div>
            </div>  
            <div className='comments-container'>
            {comments && comments.map((comment) => {
                return(
                    <> 
                        { <div className='comment-item'>
                        <span className='author'>{comment.author}</span>
                        &nbsp;
                        <span className='time'>{moment(comment.created_at).fromNow()}</span>
                        <p className='comment-text'>{comment.text}</p>
                        </div> }
                    </>
                )})}
            </div>
        </div>
    )
}

export default Comments
