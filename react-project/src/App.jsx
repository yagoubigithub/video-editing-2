import { useState ,useEffect } from "react";
import "./fonts.css"
import "./resizing.css"
import './App.css';


import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute'
import Home from "./components/Home";
import Editor from "./components/Editor";


function App() {
  


  return (
    <div >
      
      <BrowserRouter >
       
       <Switch>
       <Route path="/" exact component={Home} />
    
       <PrivateRoute  path="/editor" component={Editor} />


       </Switch>

       </BrowserRouter>


    </div>
  );
}

export default App;
