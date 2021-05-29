import axios from 'axios'; 
import Header from './components/Header.js';
import Newscontainer from './components/Newscontainer.js';
import Footer from './components/Footer.js';
import Searchbar from './components/Searchbar.js'
import PacmanLoader from 'react-spinners/PacmanLoader';
import {css} from '@emotion/react'
import { useEffect, useState } from 'react';

const emo = css`
position: absolute;
top: 40%;
right: 50%;
transform: translate (50%, -50%);
`



function App() {


  const [news, setNews] = useState()
  const [isLoading, setLoading] = useState(false)

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


    useEffect(() => {
      setLoading(true)
      axios
      .get(`http://hn.algolia.com/api/v1/search?&tags=story&hitsPerPage=10`)
      .then((res) => {
        console.log(res.data.hits)
        setLoading(false)
      })
      .catch((err) => {
       console.log(`Upss ... ${err}`)
        setLoading(true)
      })
    }, [])
   



    
    
  return (
    <div className="App">
      <PacmanLoader css={emo} size={100} color={'#ff6600'} speedMultiplier={1} loading={isLoading} />
 
     <Header />
     <Newscontainer />
     <Footer /> 
    </div>
  );
}

export default App;
