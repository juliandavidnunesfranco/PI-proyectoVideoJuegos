import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import  CreateVideogame  from "./components/CreateVideogame";

function App() {
    return(
    
      <BrowserRouter>
          <React.Fragment>

            <Route exact path="/" component={LandingPage}/>
            <Route path="/home" component={Home}/>
            <Route path="/create" component={CreateVideogame}/>

          </React.Fragment>           
      </BrowserRouter>
    
    )

};


export default App;
