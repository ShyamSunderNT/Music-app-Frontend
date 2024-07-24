import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    allSongs: [],
    tempAllSongs: [],
    currentSong: null,
    currentSongIndex: 0,
    selectedPlaylist: null,
    selectedPlaylistForEdit: null,
    isPlaying: false,
    currentTime: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setSelectedPlaylistForEdit: (state, action) => {
      state.selectedPlaylistForEdit = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

export const {
  setUser,
  setAllSongs,
  setCurrentSong,
  setCurrentSongIndex,
  setSelectedPlaylist,
  setSelectedPlaylistForEdit,
  setIsPlaying,
  setCurrentTime,
} = userSlice.actions;

export default userSlice.reducer;