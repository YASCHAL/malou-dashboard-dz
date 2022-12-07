import axios from 'axios';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config';
import { AuthContext } from '../../context/AuthContext'
import './login.css'

const Login = () => {
    const [credentials,setCredentials] = useState({
        username : undefined,
        password : undefined,
    })
    const {loading, error, Dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    }
    const handleClick = async e =>{
        e.preventDefault()
        Dispatch({type : "LOGIN_START"})
        try{
           const res = await axiosInstance.post('/auth/login',credentials)
           if(res.data.isAdmin){
            Dispatch({type:"LOGIN_SUCCESS", payload : res.data.details})
            navigate('/')
           }else{
            Dispatch({type:"LOGIN_FAILURE", payload : {message : "You are not allowed!"} })
           }
           
        }catch(err){
            Dispatch({type:"LOGIN_FAILURE", payload : err.response.data})
        }
    }

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="login">
        <div className="login_container">
          <div className="signIn">
            <h1>sign-in</h1>
            <div className="sii">
              <input
                onChange={handleChange}
                id="username"
                type="text"
                className="username"
                placeholder="Username"
              />
            </div>
            <div className="sii">
              <input
                onChange={handleChange}
                id="password"
                type="password"
                className="password"
                placeholder="your password"
              />
            </div>

            <button
              className="login__button"
              disabled={loading}
              onClick={handleClick}
            >
              Login
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      </div>
      </>
  )
}

export default Login