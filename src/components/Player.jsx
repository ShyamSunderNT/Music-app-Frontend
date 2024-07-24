import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setCurrentSongIndex, setCurrentTime, setIsPlaying } from '../redux/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faForwardStep,
    faBackwardStep,
    faVolumeLow,
    faVolumeXmark,
    faShuffle,
} from "@fortawesome/free-solid-svg-icons";

const Player = () => {
    const [volume, setVolume] = useState(0.5);
    const [shuffleOn, setShuffleOn] = useState(false);
    const dispatch = useDispatch();
    const audioRef = useRef(new Audio()); // Create a new audio element instance

    const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } = useSelector((state) => state.user);

    const onPlay = () => {
        if (audioRef.current && !isPlaying) {
            audioRef.current.play().then(() => {
                dispatch(setIsPlaying(true));
            }).catch((error) => {
                console.error('Failed to play audio:', error);
            });
        }
    };

    const onPause = () => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            dispatch(setIsPlaying(false));
            dispatch(setCurrentTime(audioRef.current.currentTime)); // Store current playback position
        }
    };
    const onPrev = () => {
        if (currentSongIndex !== 0 && !shuffleOn) {
            dispatch(setCurrentSongIndex(currentSongIndex - 1));
            dispatch(setCurrentSong(allSongs[currentSongIndex - 1]));
        } else {
            const randomIndex = Math.floor(Math.random() * allSongs.length);
            dispatch(setCurrentSongIndex(randomIndex));
            dispatch(setCurrentSong(allSongs[randomIndex]));
        }
    };

    const onNext = () => {
        if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
            dispatch(setCurrentSongIndex(currentSongIndex + 1));
            dispatch(setCurrentSong(allSongs[currentSongIndex + 1]));
        } else {
            const randomIndex = Math.floor(Math.random() * allSongs.length);
            dispatch(setCurrentSongIndex(randomIndex));
            dispatch(setCurrentSong(allSongs[randomIndex]));
        }
    };

    useEffect(() => {
        if (currentTime) {
            if (audioRef.current) {
                audioRef.current.currentTime = currentTime;
            }
        }
    }, [currentTime]);

    useEffect(() => {
        if (!currentSong && allSongs.length > 0) {
            dispatch(setCurrentSong(allSongs[0]));
        }
    }, [allSongs]);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio && currentSong) {
            audio.pause(); // Pause any ongoing playback
            audio.src = currentSong.src; // Set the new audio source
            audio.load(); // Load the new audio source
            if (isPlaying) {
                audio.play().then(() => {
                    // Playback started successfully
                }).catch((error) => {
                    console.error('Failed to play audio:', error);
                });
            }
        }
    }, [currentSong, isPlaying]);

    return (
        <div className="fixed-bottom px-3 py-1 shadow player bg-light w-100 bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center ps-2 song-details">
                    <img src="https://play-lh.googleusercontent.com/aCTAc2CKkYvUqhkPJkJ_MLSDrJZeJKXPhNlbbnWOtbAo6OzPyjMY_bQAR09OgjFnxMwY" alt="player-image" className="player-image pe-2"/>
                    <div>
                        <h1 className="fs-5">{currentSong?.title}</h1>
                        <h1 className="text-secondary fs-5">
                            {currentSong?.artist} , {currentSong?.album} , {currentSong?.year}
                        </h1>
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center player-controls">
                    <audio
                        ref={audioRef}
                        onTimeUpdate={(e) => {
                            dispatch(setCurrentTime(e.target.currentTime));
                        }}
                    ></audio>
                    <div className="d-flex gap-5 align-items-center fs-5 text-orange">
                        <FontAwesomeIcon
                            icon={faBackwardStep}
                            onClick={onPrev}
                            className="p-1"
                        />
                        {isPlaying ? (
                            <FontAwesomeIcon
                                icon={faPause}
                                onClick={onPause}
                                className="p-1"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faPlay}
                                onClick={onPlay}
                                className="p-1 text-orange"
                            />
                        )}

                        <FontAwesomeIcon
                            icon={faForwardStep}
                            onClick={onNext}
                            className="p-1"
                        />
                    </div>
                    <div className="d-flex gap-3 align-items-center w-100 fs-5">
                        <FontAwesomeIcon
                            icon={faShuffle}
                            className={`${shuffleOn && "text-orange"}`}
                            onClick={() => {
                                setShuffleOn(!shuffleOn);
                            }}
                        />
                        <h1 className="fs-5">
                            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
                        </h1>
                        <input
                            type="range"
                            className="p-0 w-100"
                            min={0}
                            max={Number(currentSong?.duration) * 60}
                            value={currentTime}
                            onChange={(e) => {
                                if (audioRef.current) {
                                    audioRef.current.currentTime = e.target.value;
                                    dispatch(setCurrentTime(e.target.value));
                                }
                            }}
                        />
                        <h1 className="fs-5">{currentSong?.duration}</h1>
                    </div>
                </div>

                <div className="d-flex gap-3 align-items-center volume-controls pe-2">
                    <FontAwesomeIcon
                        icon={faVolumeXmark}
                        onClick={() => {
                            setVolume(0);
                            if (audioRef.current) {
                                audioRef.current.volume = 0;
                            }
                        }}
                    />
                    <input
                        type="range"
                        className="p-0"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={(e) => {
                            if (audioRef.current) {
                                audioRef.current.volume = e.target.value;
                                setVolume(e.target.value);
                            }
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faVolumeLow}
                        onClick={() => {
                            setVolume(1);
                            if (audioRef.current) {
                                audioRef.current.volume = 1;
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;

// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCurrentSong, setCurrentSongIndex, setCurrentTime, setIsPlaying } from '../redux/userSlice';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faPlay,
//     faPause,
//     faForwardStep,
//     faBackwardStep,
//     faVolumeLow,
//     faVolumeXmark,
//     faShuffle,
// } from "@fortawesome/free-solid-svg-icons";
  
// const Player = () => {
//     const [volume, setVolume] = useState(0.5);
//     const [shuffleOn, setShuffleOn] = useState(false);
//     const dispatch = useDispatch();
//     const audioRef = useRef(null); // Use useRef to create a ref for the audio element

//     const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } = useSelector((state) => state.user);

//     // Play the audio
//     const onPlay = () => {
//         if (audioRef.current) {
//             audioRef.current.play();
//             dispatch(setIsPlaying(true));
//         }
//     };

//     // Pause the audio
//     const onPause = () => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             dispatch(setIsPlaying(false));
//         }
//     };

//     // Play the previous song
//     const onPrev = () => {
//         if (currentSongIndex !== 0 && !shuffleOn) {
//             dispatch(setCurrentSongIndex(currentSongIndex - 1));
//             dispatch(setCurrentSong(allSongs[currentSongIndex - 1]));
//         } else {
//             const randomIndex = Math.floor(Math.random() * allSongs.length);
//             dispatch(setCurrentSongIndex(randomIndex));
//             dispatch(setCurrentSong(allSongs[randomIndex]));
//         }
//     };

//     // Play the next song
//     const onNext = () => {
//         if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
//             dispatch(setCurrentSongIndex(currentSongIndex + 1));
//             dispatch(setCurrentSong(allSongs[currentSongIndex + 1]));
//         } else {
//             const randomIndex = Math.floor(Math.random() * allSongs.length);
//             dispatch(setCurrentSongIndex(randomIndex));
//             dispatch(setCurrentSong(allSongs[randomIndex]));
//         }
//     };

//     // Update the audio time when currentTime changes
//     useEffect(() => {
//         if (currentTime) {
//             if (audioRef.current) {
//                 audioRef.current.currentTime = currentTime;
//             }
//         }
//     }, [currentTime]);

//     // Initialize currentSong when allSongs are loaded
//     useEffect(() => {
//         if (!currentSong && allSongs.length > 0) {
//             dispatch(setCurrentSong(allSongs[0]));
//         }
//     }, [allSongs]);

//     // Auto-play when currentSong changes
//     useEffect(() => {
//         if (isPlaying && currentSong) {
//             if (audioRef.current) {
//                 audioRef.current.pause();
//                 audioRef.current.load();
//                 audioRef.current.play();
//             }
//         }
//     }, [currentSong, isPlaying]);

//     return (
//         <div className="fixed-bottom px-3 py-1 shadow player bg-light w-100 bg-dark text-gray">
//             <div className="d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center ps-2 song-details">
//                     <img src="https://play-lh.googleusercontent.com/aCTAc2CKkYvUqhkPJkJ_MLSDrJZeJKXPhNlbbnWOtbAo6OzPyjMY_bQAR09OgjFnxMwY" alt="player-image" className="player-image pe-2"/>
//                     <div>
//                         <h1 className="fs-5">{currentSong?.title}</h1>
//                         <h1 className="text-secondary fs-5">
//                             {currentSong?.artist} , {currentSong?.album} , {currentSong?.year}
//                         </h1>
//                     </div>
//                 </div>

//                 <div className="d-flex flex-column align-items-center player-controls">
//                     <audio
//                         src={currentSong?.src}
//                         ref={audioRef}
//                         onTimeUpdate={(e) => {
//                             dispatch(setCurrentTime(e.target.currentTime));
//                         }}
//                     ></audio>
//                     <div className="d-flex gap-5 align-items-center fs-5 text-orange">
//                         <FontAwesomeIcon
//                             icon={faBackwardStep}
//                             onClick={onPrev}
//                             className="p-1"
//                         />
//                         {isPlaying ? (
//                             <FontAwesomeIcon
//                                 icon={faPause}
//                                 onClick={onPause}
//                                 className="p-1"
//                             />
//                         ) : (
//                             <FontAwesomeIcon
//                                 icon={faPlay}
//                                 onClick={onPlay}
//                                 className="p-1 text-orange"
//                             />
//                         )}

//                         <FontAwesomeIcon
//                             icon={faForwardStep}
//                             onClick={onNext}
//                             className="p-1"
//                         />
//                     </div>
//                     <div className="d-flex gap-3 align-items-center w-100 fs-5">
//                         <FontAwesomeIcon
//                             icon={faShuffle}
//                             className={`${shuffleOn && "text-orange"}`}
//                             onClick={() => {
//                                 setShuffleOn(!shuffleOn);
//                             }}
//                         />
//                         <h1 className="fs-5">
//                             {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
//                         </h1>
//                         <input
//                             type="range"
//                             className="p-0 w-100"
//                             min={0}
//                             max={Number(currentSong?.duration) * 60}
//                             value={currentTime}
//                             onChange={(e) => {
//                                 if (audioRef.current) {
//                                     audioRef.current.currentTime = e.target.value;
//                                     dispatch(setCurrentTime(e.target.value));
//                                 }
//                             }}
//                         />
//                         <h1 className="fs-5">{currentSong?.duration}</h1>
//                     </div>
//                 </div>

//                 <div className="d-flex gap-3 align-items-center volume-controls pe-2">
//                     <FontAwesomeIcon
//                         icon={faVolumeXmark}
//                         onClick={() => {
//                             setVolume(0);
//                             if (audioRef.current) {
//                                 audioRef.current.volume = 0;
//                             }
//                         }}
//                     />
//                     <input
//                         type="range"
//                         className="p-0"
//                         min={0}
//                         max={1}
//                         step={0.1}
//                         value={volume}
//                         onChange={(e) => {
//                             if (audioRef.current) {
//                                 audioRef.current.volume = e.target.value;
//                                 setVolume(e.target.value);
//                             }
//                         }}
//                     />
//                     <FontAwesomeIcon
//                         icon={faVolumeLow}
//                         onClick={() => {
//                             setVolume(1);
//                             if (audioRef.current) {
//                                 audioRef.current.volume = 1;
//                             }
//                         }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Player;