import axios from 'axios'; 
import Header from './components/Header.js';
import Newscontainer from './components/Newscontainer.js';
import Footer from './components/Footer.js';
import PacmanLoader from 'react-spinners/PacmanLoader';
import {css} from '@emotion/react'
import { useEffect, useState } from 'react';
import moment from 'moment'


const emo = css`
position: absolute;
top: 40%;
right: 50%;
transform: translate (50%, -50%);
`



function App() {

  const [news, setNews] = useState()
  const [isLoading, setLoading] = useState(true)
  const [search, setSearch] = useState('')


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
      console.log(e)
      console.log(search)
      setSearch(search)
      setSearch('')
    }

    useEffect(() => {
      const refresh = setInterval(() => {
        setLoading(false)
        axios
        .get(`http://hn.algolia.com/api/v1/search_by_date?query=${search}&tags=front_page&hitsPerPage=50`)
        .then((res) => {
          console.log(res.data.hits)
          setLoading(false)
          setNews(res.data.hits)
        })
        .catch((err) => {
         console.log(`Upss ... ${err}`)
         alert('Upsss I did again')
         setLoading(true)
        })
      }, 5000);
      return () => clearInterval(refresh);
    }, [search])

    
    
  return (
    <>
      <PacmanLoader css={emo} size={100} color={'#ff6600'} speedMultiplier={1} loading={isLoading} />
     <Header />
     {news && news.map((story) => {
       return(
        <div className='news-container' key={story.objectID}>
            <div className='news-wrapper' >
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
                    <a href={`https://hn.algolia.com/api/v1/items/${story.objectID}`} className='comments'>{story.num_comments} comments</a>
                </div>
            </div>           
        </div>
       )
     })}
      <Footer onChange={(e) => setSearch(e.target.value)} onSubmit={handleSubmit} /> 
    </>
  );
}

export default App;
