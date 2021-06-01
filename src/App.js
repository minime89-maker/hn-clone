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
top: 40%;
right: 50%;
transform: translate (50%, -50%);
`



function App() {

  const [news, setNews] = useState()
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [commentsView, setCommentsView] = useState(false)
  const [activeArticle, setArticle] = useState()

  const [offSet, setOffSet] = useState(0)
  const [perPage] = useState(10)
  const [pageCount, setPageCount] = useState(0)


/* const searchTopic= (topic) => {
  axios({
  method: 'get',
  url: `http://hn.algolia.com/api/v1/search?query=${topic}&tags=story`
})  
  .then(function (response) { 
    console.log(`for topic: ${topic}\n`+ JSON.stringify(response))
  })
} 
searchTopic('react');

axios({
    method: 'get',
    url: 'http://hn.algolia.com/api/v1/search?tags=front_page'
  })
    .then(function (response) {
      console.log(response)
    }); */

    const handleSubmit = (e) => {
      e.preventDefault()
      e.target.reset()
      if(!search) return
      setSearch(search)
      setSearch('')
    }

    const handleSetArticle = (story) => {
      setLoading(true)
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
        setLoading(true)
       console.log(`Error! ${err}`)
       alert('Error executing comments getter request!')
       setCommentsView(false)
       setArticle()
      })

    }


    const getData = () => {
      setLoading(true)
      axios
      .get(`http://hn.algolia.com/api/v1/search_by_date?query=${search}&tags=front_page&hitsPerPage=50`)
      .then((res) => {
        console.log(res.data.hits)

        setLoading(false)
        const data = res.data.hits
        const slice = data.slice(offSet, offSet + perPage)
        const result = slice.map((story) => {
          return(
               <div className='news-wrapper' key={story.objectID}>
                   <div className='news-title'>
                       <a href={story.url}>{story.title}</a>
                       <span className='news-title-url'>
                         <a  rel='noreferrer noopener' target='_blank' href={story.url}>({story.url})</a>
                       </span>
                   </div>
                   <div className='news-info'>
                       <span className='points'>{story.points} </span>
                       points&nbsp;
                       by&nbsp;
                       <span className='author'>{story.author}</span>
                       &nbsp;
                       <span className='time'>{moment(story.created_at).fromNow()}</span>
                       &nbsp;|
                       <span>&nbsp;<span className='hide'>hide</span> |&nbsp;</span>
                       <a onClick={(e) => handleSetArticle(story)} href='#' className='comments'>{story.num_comments} comments</a>
                   </div>
               </div>      
         
          )
        })
        setNews(result)
        setPageCount(Math.ceil(data.length / perPage)) 
      })
      .catch((err) => {
       console.log(`Upss ... ${err}`)
       alert('Upsss I did again')
       setLoading(true)
      })

    }

    const perClick = (e) => {
      const selectedPage = e.selected
      setOffSet(selectedPage + 1)
    }

    useEffect(() => {
      // const refresh = setInterval(() => {
      //   getData()
      // }, 500000);
      // return () => clearInterval(refresh);
      getData()
    }, [search, offSet])


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
     {!news ? <PacmanLoader css={emo} size={100} color={'#ff6600'} speedMultiplier={1} loading={isLoading} /> : news}
     <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
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
      <Footer value={search} onChange={(e) => setSearch(e.target.value)} onSubmit={handleSubmit} /> 
    </>
  );
}

export default App;
