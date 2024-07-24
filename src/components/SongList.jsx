import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setCurrentSongIndex, setSelectedPlaylist } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SongList = () => {
    const { currentSong, selectedPlaylist, allSongs } = useSelector(
        (state) => state.user
      );
      const [songsToPlay, setSongsToPlay] = useState([]);
    
      const dispatch = useDispatch();
      const [searchKey, setSearchKey] = useState("");
      const navigate = useNavigate(); 
    
      useEffect(() => {
        if (selectedPlaylist) {
          if (
            selectedPlaylist &&
            selectedPlaylist.name === "All Songs" &&
            searchKey !== ""
          ) {
            const tempSongs = [];
    
            selectedPlaylist.songs.forEach((song) => {
              if (JSON.stringify(song).toLowerCase().includes(searchKey)) {
                tempSongs.push(song);
              }
            });
            console.log(tempSongs);
            setSongsToPlay(tempSongs);
          } else {
            setSongsToPlay(selectedPlaylist?.songs);
          }
        }
      }, [selectedPlaylist, searchKey]);

      const navigateToAdmin = () => {
        navigate("/admin");
      };
    
      return (
        <div className="d-flex flex-column gap-3 shadow p-3 rounded">
          <div className="p-2">
            <input
              type="text"
              placeholder="Song , Artist , Album"
              className="rounded w-100 p-2"
              onFocus={() =>
                dispatch(
                  setSelectedPlaylist({
                    name: "All Songs",
                    songs: allSongs,
                  })
                )
              }
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
          <div className="overflow-auto " style={{ height: "380px" }}>
            {songsToPlay.map((song, index) => {
              const isPlaying = currentSong?._id === song._id;
              return (
                <div
                  className={`p-2 fs-6 songlist d-flex align-items-center justify-content-between custom-cursor ${
                    isPlaying && "shadow rounded selected fw-bold "
                  }`}
                  onClick={() => {
                    dispatch(setCurrentSong(song));
                    dispatch(setCurrentSongIndex(index));
                  }}
                >
                  <div>
                    <h1 className="fs-4">{song.title}</h1>
                    <h1 className="fs-4">
                      {song.artist} {song.album} {song.year}
                    </h1>
                  </div>
                  <div>
                    <h1 className="fs-4">{song.duration}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-primary"
            onClick={navigateToAdmin}
          >
            Add Songs
          </button>
        </div>
      );
    }

export default SongList;