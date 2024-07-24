import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAllSongs, setUser } from '../redux/userSlice';
import { showLoading, hideLoading } from '../redux/alertSlice';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                dispatch(showLoading());
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/getuserdata`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch(hideLoading());
                if (response.data.success) {
                    dispatch(setUser(response.data.data));
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                dispatch(hideLoading());
                console.error('Error fetching user data:', error);
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false); // Set loading state to false regardless of success or error
            }
        };

        if (!user) {
            fetchUserData(); // Fetch user data only if user is not already present in Redux state
        }
    }, [user, dispatch, navigate]);

    const getAllSongs = async ()=>{
                    try {
                        dispatch(showLoading())
                        const response = await axios.get('http://localhost:5000/api/songs/get-all-songs', {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            }
                        });
                        dispatch(hideLoading())
                        dispatch(setAllSongs(response.data.data))
                    } catch (error) {
                        dispatch(hideLoading());
                        console.log(error);
                    }
                }
        
                useEffect(() => {
                    getAllSongs();
                  }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); // Refresh the page or clear user state as needed
    };

    // Ensure user is not null or undefined before accessing user.name
    const userName = user && user.name ? user.name.toUpperCase() : "Guest";

    return (
        <div className="main bg-warning">
            <div className="header d-flex justify-content-between mt-0 p-3 shadow align-items-center bg-dark text-warning">
                <h1
                    className="fs-4 fw-bold custom-cursor"
                    onClick={() => navigate("/")}
                >
                    <b className="logo fst-italic">Rhythmic Pulse</b>
                </h1>
                <div className="d-flex align-items-center gap-2">
                    <h1 className="fs-4">{userName}</h1>
                    {user && (
                        <FontAwesomeIcon
                        icon={faRightFromBracket}
                            className="fs-4"
                            onClick={handleLogout}
                        >
                            
                            </FontAwesomeIcon>
                    )}
                    
                    {!user && (
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
            
            </div>
        
    );
};

export default Header;