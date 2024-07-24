import React from 'react';
import Player from '../components/Player';
import PlayList from '../components/playList';
import SongList from '../components/SongList';



const Home = () => {
    return (
      <div>
      <div className="row fs-7 home">
        <div className="col-6">
         <SongList />
        </div>
        <div className="col-6"> 
          <PlayList />
        </div>
      </div>
      <Player />
     </div>

       
       
        
          

          
    );
};

export default Home;