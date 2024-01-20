import { useState ,useEffect } from "react";
import "./fonts.css"
import "./resizing.css"
import './App.css';


import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute'
import Home from "./components/Home";
import Editor from "./components/Editor";
import Template from "./components/Template";

import { TextProvider } from "./context/TextContext"

function App() {
  


  return (
    <TextProvider >
      
      <BrowserRouter >
       
       <Switch>
       <Route path="/" exact component={Home} />
    
       <PrivateRoute  path="/editor" component={Editor} />
       <Route  path="/template/:templateId" component={Template} />

       </Switch>

       </BrowserRouter>


    </TextProvider>
  );
}

export default App;
