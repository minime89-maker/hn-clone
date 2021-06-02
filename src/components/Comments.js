import moment from 'moment'
import React from 'react'

function Comments({ key, title, url, points, author, time, comments }) {
    return (
        <div className='news-container'>
            <div className='news-wrapper' key={key}>
                <div className='news-title'>
                    <a href={title}>{title}</a>
                    <div className='news-title-url'>
                        <a className='news-title-url' href={url}>({url})</a>
                    </div>
                </div>
                <div className='news-info'>
                    <span className='points'>{points} points |</span>
                    &nbsp;
                    <span className='author'>by {author} |</span>
                    &nbsp;
                    <span className='time'>{moment(time).fromNow()} |</span>
                    <span> hide |</span>
                    &nbsp;
                    <span className='comments-button' href='#'>{comments.length} comments</span>
                </div>
            </div>  
            {/* <div className='text-area'>
                <textarea name="" id="" cols="45" rows="10"></textarea>
                <button type='button' className='text-area-btn'>add comment</button>
            </div> */}
            <div className='comments-container'>
            {comments && comments.map((comment,) => {
                return(
                    <> 
                        { <div className='comment-item' key={comment.id}>
                        <span className='comment-author'>{comment.author}</span>
                        &nbsp;
                        <span className='comment-time'>{moment(comment.created_at).fromNow()}</span>
                        &nbsp;
                        <span className='comment-time'>[-]</span>
                        <p className='comment-text'>{comment.text}</p>
                        </div> }
                    </>
                )})}
            </div>
        </div>
    )
}

export default Comments
