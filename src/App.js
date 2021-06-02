import axios from 'axios'; 
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import PacmanLoader from 'react-spinners/PacmanLoader';
import {css} from '@emotion/react'
import { useEffect, useState } from 'react';
import moment from 'moment'
import Comments from './components/Comments.js';
import ReactPaginate from 'react-paginate';


const emo = css`
position: absolute;
top: 50%;
right: 50%;
transform: translate (50%, -50%);
`


function App() {

  const [news, setNews] = useState()
  const [isLoading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [commentsView, setCommentsView] = useState(false)
  const [activeArticle, setArticle] = useState()
  const [offSet, setOffSet] = useState(0)
  const [perPage] = useState(30)
  const [pageCount, setPageCount] = useState(0)
  const [isError, setIsError] = useState(false)


    const handleSubmit = (e) => {
      e.preventDefault()
      e.target.reset()
   if (search.length === 0){
          alert('Search for something !!!')
      } else {
        setSearch(search ? search : console.log('Happy Hacking'))
      }
    }

    const handleSetArticle = (story) => {
      setLoading(true)
      setIsError(false)
      console.log('selected story:' + story + 'caling API to get data')
      const storyID = story.objectID
      //https://hn.algolia.com/api/v1/items/${storyID}
      console.log('article selected='+storyID+'\ngetting data')
      axios
      .get(`https://hn.algolia.com/api/v1/items/${storyID}?tags=comment`)
      .then((res) => {
        setLoading(false)
        console.log('res=' + JSON.stringify(res))
        console.log('res data='+JSON.stringify(res.data))
        console.log('res data hits='+JSON.stringify(res.data.hits))
        setArticle(res.data)
        setCommentsView(true)
      })
      .catch((err) => {
       console.log(`Error! ${err}`)
       alert('Error executing comments getter request!')
       setCommentsView(false)
       setArticle()
       setLoading(true)
       setIsError(true)
      })
    }

   useEffect(() => {
     const getNews = () => {
      setLoading(true)
      setIsError(false)
      axios
      .get(`https://hn.algolia.com/api/v1/search?query=${search}&tags=story&hitsPerPage=200`)
      .then((res) => {
        setLoading(false)
        console.log(res.data.hits)
        const data = res.data.hits
        const slice = data.slice(offSet, offSet + perPage)
        {slice.length === 0 && alert('No matching results !!!')}
        const result = slice.map((story) => {
          return(
               <div className='news-wrapper' key={story.objectID}>
                   <div className='news-title'>
                       <a href={story.url}>{story.title}</a>
                       <div className='news-title-url'>
                         <a  rel='noreferrer noopener' target='_blank' href={story.url}>{!story.url ? '(no domain)' : (story.url)}</a>
                       </div>
                   </div>
                   <div className='news-info'>
                       <span className='points'>{story.points} </span>
                       points
                       by&nbsp;
                       <span className='author'>{story.author}</span>
                       &nbsp;
                       <span className='time'>{moment(story.created_at).fromNow()}</span>&nbsp;|&nbsp;
                       <span><span className='hide'>hide</span>&nbsp;|</span>
                       &nbsp;
                       <span><span className='past'>past</span>&nbsp;|</span>
                       &nbsp;
                       <a onClick={(e) => handleSetArticle(story)} href='#' className='comments'>{story.num_comments === 0 ? 'discuss' : `${story.num_comments} comments`}</a>
                   </div>
               </div>    
          )
        })
        setNews(result)
        setPageCount(Math.ceil(data.length / perPage)) 
      })
      .catch((err) => {
        setLoading(false)
        setIsError(true)
       console.log(`Upss ... ${err}`)
      })
     }
      getNews()
      const interval = setInterval(() => getNews(), 500000)
      return () => clearInterval(interval)
   }, [search, offSet])

    const perClick = (e) => {
      const selectedPage = e.selected
      setOffSet(selectedPage + 1)
      window.scrollTo(0, 0)
    }


    console.log('commentsView status ='+commentsView)
    console.log('activeArticle = ' + JSON.stringify(activeArticle))
    
    if (commentsView && activeArticle !== null && activeArticle !== undefined) {
      console.log('Attempting to render details!')
      return (
        <>
        <Header />
        <PacmanLoader css={emo} size={100} color={'#ff6600'} speedMultiplier={1} loading={isLoading} />
          <Comments key={activeArticle.objectID} title={activeArticle.title} url={activeArticle.url} points={activeArticle.points} author={activeArticle.author} time={activeArticle.created_at} comments={activeArticle.children}></Comments>
          <Footer onChange={(e) => setSearch(e.target.value)} onSubmit={handleSubmit} /> 
        </>
      )
    }
      console.log('Rendering regular news or search results!')
  return (
    <>
     <Header />
     <div className='news-container' >
     {isLoading && <PacmanLoader css={emo} size={80} color={'#ff6600'} speedMultiplier={1} loading={isLoading} />}
     {isError && alert('ERRORRRRR')}
     {news && news}
     {search && news}
     <ReactPaginate
                    previousLabel="&larr;"
                    nextLabel="&rarr;"
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={perClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>    
     </div>    
      <Footer onChange={(e) => setSearch(e.target.value.trim())} onSubmit={handleSubmit} /> 
    </>
  );
}

export default App;