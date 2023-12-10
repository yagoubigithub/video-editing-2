import React from 'react'


import Signin from "./Signin";
import Signup from "./Signup";
import { isAuthenticated } from "./../auth";
import { Redirect } from "react-router-dom";

const Home = () => {
  return (
    <div>
    {isAuthenticated() && <Redirect to="/editor" />}
      
      <div className="home-container">
        <Signin />
        <Signup />
      </div>
    </div>
  )
}

export default Home