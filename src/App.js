import axios from 'axios'; 
import Header from './components/Header.js';
import Newscontainer from './components/Newscontainer.js';
import Footer from './components/Footer.js';
import Searchbar from './components/Searchbar.js'
import PacmanLoader from 'react-spinners/PacmanLoader';
import {css} from '@emotion/react'

const emo = css`
position: absolute;
top: 50%;
right: 50%;
transform: translate (50%, -50%);
`



function App() {
//  const url = 'http://hn.algolia.com/api/v1/search?tags=front_page';
const searchTopic= (topic) => {
  axios({
    //get by default
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
    });



    
    
  return (
    <div className="App">
{/*     <PacmanLoader css={emo} size={100} color={'purple'} speedMultiplier={3} />
 */}    
     <Header />
     <Newscontainer />
     <Footer /> 
    </div>
  );
}

export default App;
