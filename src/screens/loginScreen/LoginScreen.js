import React from 'react'
import './_loginScreen.scss'




const LoginScreen = () => {
  
  

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  }


  return (
    <div className="login">
        <div className="login__container">
            <img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt=''/>
            <button onClick={google}>Login With Google</button>
            <p>This Project is made using YOUTUBE DATA API</p>
        </div>
    </div>
  )
}

export default LoginScreen