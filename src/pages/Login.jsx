import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user,setUser] =useState({
        email: "",
        password: "",
    })
    const login =async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.post ('https://music-app-backend-6rba.onrender.com/api/login',user)
            dispatch(hideLoading());
            if(response.data.success){
                toast.success("Logged In Successfully");
                localStorage.setItem("token", response.data.data);
                navigate('/');
            }
            else{
                toast.error("Invalid Email or Password");
               
            }
        } catch (error) {
            toast.error("Something went wrong");
            dispatch(hideLoading());
            console.log(error);
        }
    }
    return (
        <div className='container-fluid'>
             <img  src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwNTktMDUwYy1rdjd2ODlqZy5qcGc.jpg" alt="img" 
            style={{ width: "100%" }}
            />
            <div className='d-flex align-items-center justify-content-center centered'> 
                <div className='d-flex flex-column gap-4 p-4'>
                <h1 className='fs-3 fw-bold text-orange'>Welcome Back To RhythmicPulse</h1>
                <input 
                type='text'
                placeholder='Enter your Email'
                value={user.email}
                onChange={(e)=>setUser({...user, email: e.target.value})}
                className='p-2 rounded'
                />
                <input 
                type='password'
                placeholder='Enter your password'
                value={user.password}
                onChange={(e)=>setUser({...user, password: e.target.value})}
                className='p-2 rounded'
                />
              <button
            className="border rounded bg-orange p-2 fw-bold text-white"
            onClick={login}
            
            
          > Login</button>
          <Link to='/register' className="text-secondary underline"> 
          Don't have a account ? Click Here To Signup</Link>
                </div>
            </div>
            
        </div>
    );
};

export default Login;