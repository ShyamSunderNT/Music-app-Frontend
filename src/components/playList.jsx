// import React, { useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { hideLoading, showLoading } from '../redux/alertSlice';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { setSelectedPlaylist, setSelectedPlaylistForEdit, setUser } from '../redux/userSlice';
// import axios from 'axios';

// const playList = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { user, allSongs, selectedPlaylist } = useSelector(
//       (state) => state.user
//     );
//     const allPlylists = [
//       {
//         name: "All Songs",
//         songs: allSongs,
//       },
//       ...user.playlists,
//     ];
//     const onDelete = async (name) => {
//         try {
//           dispatch(showLoading());
//           const response = await axios.post(
//             "http://localhost:5000/api/songs/delete-playlist",
//             {
//               name,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
//           dispatch(hideLoading());
//           if (response.data.success) {
//             toast.success("Playlist deleted successfully");
//             dispatch(
//               setSelectedPlaylist({
//                 name: "All Songs",
//                 songs: allSongs,
//               })
//             );
//             dispatch(setUser(response.data.data));
//           } else {
//             toast.error(response.data.message);
//           }
//         } catch (error) {
//           dispatch(hideLoading());
//           toast.error("Something went wrong");
//         }
//       };
    
//       useEffect(() => {
//         if (!selectedPlaylist && allSongs.length > 0) {
//           dispatch(setSelectedPlaylist(allPlylists[0]));
//         }
//       }, [selectedPlaylist, allSongs]);
    
//     return (
//         <div className=" shadow py-5 px-3 rounded">
//       <div className="d-flex justify-content-between w-100 ">
//         <h1 className="fs-4">Your Playlists</h1>
//         <h1
//           className="underline custom-cursor fs-6 btn btn-success"
//           onClick={() => {
//             navigate("/create-edit-playlist");
//           }}
//         >
//           Create Playlist
//         </h1>
//       </div>

//       <div className="d-flex justify-content-between mt-5">
//         {allPlylists?.map((playlist, index) => {
//           const isSelected = playlist?.name === selectedPlaylist?.name;
//           return (
//             <div
//               className={`d-flex flex-column gap-1 shadow p-2 custom-cursor w-50 ${
//                 isSelected && "selected rounded"
//               }`}
//               onClick={() => {
//                 dispatch(setSelectedPlaylist(playlist));
//               }}
//             >
//               <h1 className="fs-5">{playlist?.name}</h1>
//               <h1 className="fs-5">{playlist?.songs?.length} Songs</h1>
//               <hr />
//               <div className="d-flex gap-3 justify-content-between">
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="text-danger"
//                   onClick={() => {
//                     onDelete(playlist.name);
//                   }}
//                 />

//                 <FontAwesomeIcon
//                   icon={faPenToSquare}
//                   className="text-success"
//                   onClick={() => {
//                     dispatch(setSelectedPlaylistForEdit(playlist));
//                     navigate("/create-edit-playlist");
//                   }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default playList;

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { setSelectedPlaylist, setSelectedPlaylistForEdit, setUser } from '../redux/userSlice';
import axios from 'axios';

const PlayList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, allSongs, selectedPlaylist } = useSelector(state => state.user);
    const allPlaylists = user ? [
        {
            name: "All Songs",
            songs: allSongs,
        },
        ...user.playlists,
    ] : [];

    const onDelete = async (name) => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "music-app-backend-6rba.onrender.com/api/songs/delete-playlist",
                { name },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success("Playlist deleted successfully");
                dispatch(setSelectedPlaylist({
                    name: "All Songs",
                    songs: allSongs,
                }));
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (user && !selectedPlaylist && allSongs.length > 0) {
            dispatch(setSelectedPlaylist(allPlaylists[0]));
        }
    }, [user, selectedPlaylist, allSongs, dispatch]);

    const handleCreatePlaylist = () => {
        navigate("/create-edit-playlist");
    };

    const handleEditPlaylist = (playlist) => {
        dispatch(setSelectedPlaylistForEdit(playlist));
        navigate("/create-edit-playlist");
    };

    const handleSelectPlaylist = (playlist) => {
        dispatch(setSelectedPlaylist(playlist));
    };

    return (
        <div className="shadow py-5 px-3 rounded">
            <div className="d-flex justify-content-between w-100">
                <h1 className="fs-4">Your Playlists</h1>
                <button
                    className="underline custom-cursor fs-6 btn btn-success"
                    onClick={handleCreatePlaylist}
                >
                    Create Playlist
                </button>
            </div>

            <div className="d-flex justify-content-between mt-5">
                {allPlaylists.map((playlist, index) => (
                    <div
                        key={index}
                        className={`d-flex flex-column gap-1 shadow p-2 custom-cursor w-50 ${playlist.name === selectedPlaylist?.name ? "selected rounded" : ""}`}
                        onClick={() => handleSelectPlaylist(playlist)}
                    >
                        <h1 className="fs-5">{playlist.name}</h1>
                        <h1 className="fs-5">{playlist.songs?.length || 0} Songs</h1>
                        <hr />
                        <div className="d-flex gap-3 justify-content-between">
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="text-danger"
                                onClick={() => onDelete(playlist.name)}
                            />
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="text-success"
                                onClick={() => handleEditPlaylist(playlist)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayList;