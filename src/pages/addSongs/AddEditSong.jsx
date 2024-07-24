// import React, { useEffect } from 'react';
// import { FileUploader } from 'react-drag-drop-files';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { hideLoading, showLoading } from '../../redux/alertSlice';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { setAllSongs } from '../../redux/userSlice';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


// const AddEditSong = () => {
//     const { allSongs, user } = useSelector((state) => state.user);
//   const urlParams = new URLSearchParams(window.location.search);
//   const songId = urlParams.get("id");
//   const dispatch = useDispatch();
//   const fileTypes = ["MP3"];
//   const navigate = useNavigate();
//   const [song, setSong] = React.useState({
//     title: "",
//     artist: "",
//     album: "",
//     year: "",
//     duration: "",
//     file: "",
//   });

//   const handleChange = (file) => {
//     setSong({ ...song, file: file });
//     console.log(file);
//   };

//   const onAdd = async () => {
//     try {
//       dispatch(showLoading());
//       const formData = new FormData();
//       Object.keys(song).forEach((key) => {
//         formData.append(key, song[key]);
//       });
//       const response = await axios.post("https://music-app-backend-6rba.onrender.com/api/admin/add-songs", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       dispatch(hideLoading());
//       if (response.data.success) {
//         toast.success("Song added successfully");
//         dispatch(setAllSongs(response.data.data));
//         navigate("/admin");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       toast.error("Something went wrong");
//     }
//   };

//   const onEdit = async () => {
//     try {
//       dispatch(showLoading());
//       const formData = new FormData();
//       Object.keys(song).forEach((key) => {
//         formData.append(key, song[key]);
//       });
//       formData.append("_id", songId);
//       const response = await axios.post("https://music-app-backend-6rba.onrender.com/api/admin/edit-song", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       dispatch(hideLoading());
//       if (response.data.success) {
//         toast.success("Song updated successfully");
//         dispatch(setAllSongs(response.data.data));
//         navigate("/admin");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       toast.error("Something went wrong");
//     }
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     if (songId && songId !== "") {
//       const existingSong = allSongs.find((s) => s._id === songId);
//       setSong(existingSong);
//     }
//   }, [allSongs]);

//   useEffect(() => {
//     if (user) {
//       if (user && !user.isAdmin)  {
//         navigate("/");
//       }
//     }
//   }, [user]);

//   return (
   
//       <div className="d-flex flex-column bg-dark">
//       <div className="d-flex p-2 mt-2">
//       <FontAwesomeIcon
//                 icon={faArrowLeft}
//                 onClick={() => {
//                   navigate("/admin");
//                 }}
//                 className="fs-2 ps-2"
//               />
//         <h1 className="fs-3 ps-2">{songId ? "Edit" : "Add"} Song</h1>
//       </div>

//         <div className="d-flex flex-column gap-3 mt-1 w-25 ps-3 mb-5">
//           <input
//             type="text"
//             placeholder="Title"
//             value={song.title}
//             onChange={(e) => {
//               setSong({ ...song, title: e.target.value });
//             }}
//             className="p-2 mt-5 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Artist"
//             value={song.artist}
//             onChange={(e) => {
//               setSong({ ...song, artist: e.target.value });
//             }}
//             className="p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Album"
//             value={song.album}
//             onChange={(e) => {
//               setSong({ ...song, album: e.target.value });
//             }}
//             className="p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Year"
//             value={song.year}
//             onChange={(e) => {
//               setSong({ ...song, year: e.target.value });
//             }}
//             className="p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Duration"
//             value={song.duration}
//             onChange={(e) => {
//               setSong({ ...song, duration: e.target.value });
//             }}
//             className="p-2 rounded"
//           />
//           <FileUploader
//             handleChange={handleChange}
//             name="file"
//             types={fileTypes}
//           />
//           {song.file && <h1 className="text-gray">{song.file.name}</h1>}
//           <div className="d-flex justify-content-end">
//             {songId && songId !== "" ? (
//               <button
//                 className="text-white bg-orange py-2 px-10 w-100 rounded fw-bold"
//                 onClick={onEdit}
//               >
//                 Update
//               </button>
//             ) : (
//               <button
//                 className="text-white bg-orange py-2 px-10 w-100 rounded fw-bold"
//                 onClick={onAdd}
//               >
//                 Add
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

      
    
//   );
// }

// export default AddEditSong;


import React, { useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setAllSongs } from '../../redux/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const AddEditSong = () => {
  const { allSongs, user } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");
  const dispatch = useDispatch();
  const fileTypes = ["MP3"];
  const navigate = useNavigate();
  const [song, setSong] = React.useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: "",
    file: "",
  });

  const handleChange = (file) => {
    setSong({ ...song, file: file });
  };

  const onAdd = async () => {
    try {
      dispatch(showLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      const response = await axios.post("https://music-app-backend-6rba.onrender.com/api/admin/add-songs", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Song added successfully");
        dispatch(setAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const onEdit = async () => {
    try {
      dispatch(showLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      formData.append("_id", songId);
      const response = await axios.post("https://music-app-backend-6rba.onrender.com/api/admin/edit-song", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Song updated successfully");
        dispatch(setAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (songId && songId !== "") {
      const existingSong = allSongs.find((s) => s._id === songId);
      setSong(existingSong);
    }
  }, [allSongs, songId]);

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="d-flex flex-column bg-dark">
      <div className="d-flex p-2 mt-2">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => {
            navigate("/admin");
          }}
          className="fs-2 ps-2"
        />
        <h1 className="fs-3 ps-2">{songId ? "Edit" : "Add"} Song</h1>
      </div>

      <div className="d-flex flex-column gap-3 mt-1 w-25 ps-3 mb-5">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={song.title}
          onChange={(e) => {
            setSong({ ...song, title: e.target.value });
          }}
          className="p-2 mt-5 rounded"
        />
        
        <label htmlFor="artist" className="form-label">Artist</label>
        <input
          type="text"
          id="artist"
          placeholder="Artist"
          value={song.artist}
          onChange={(e) => {
            setSong({ ...song, artist: e.target.value });
          }}
          className="p-2 rounded"
        />
        
        <label htmlFor="album" className="form-label">Album</label>
        <input
          type="text"
          id="album"
          placeholder="Album"
          value={song.album}
          onChange={(e) => {
            setSong({ ...song, album: e.target.value });
          }}
          className="p-2 rounded"
        />
        
        <label htmlFor="year" className="form-label">Year</label>
        <input
          type="text"
          id="year"
          placeholder="Year"
          value={song.year}
          onChange={(e) => {
            setSong({ ...song, year: e.target.value });
          }}
          className="p-2 rounded"
        />
        
        <label htmlFor="duration" className="form-label">Duration</label>
        <input
          type="text"
          id="duration"
          placeholder="Duration"
          value={song.duration}
          onChange={(e) => {
            setSong({ ...song, duration: e.target.value });
          }}
          className="p-2 rounded"
        />
        
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        
        {song.file && <h1 className="text-gray">{song.file.name}</h1>}
        
        <div className="d-flex justify-content-end">
          {songId && songId !== "" ? (
            <button
              className="text-white bg-orange py-2 px-10 w-100 rounded fw-bold"
              onClick={onEdit}
            >
              Update
            </button>
          ) : (
            <button
              className="text-white bg-orange py-2 px-10 w-100 rounded fw-bold"
              onClick={onAdd}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEditSong;