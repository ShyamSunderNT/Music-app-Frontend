import React from "react";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./pages/Header";
import CreateEditPlaylist from "./pages/CreateEditPlaylist";
import AdminHome from "./pages/addSongs/AdminHome";
import AddEditSong from "./pages/addSongs/AddEditSong";


const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Header />
        <Routes>
       
          <Route
            path="/register"
            element={
              
                <Register />
             
            }
          />
          <Route
            path="/Login"
            element={
              
                <Login />
     
            }
          />
          <Route
            path="/"
            element={
    
                <Home />
              
            }
          />
          <Route path="/create-edit-playlist" element={<CreateEditPlaylist /> } />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/add-edit-song" element={<AddEditSong /> } />
        </Routes>
      </BrowserRouter>
    </div> 
  );
};

export default App;
