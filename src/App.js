import React from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";

import './App.css';
import Auth from './components/auth/auth';
import Header from './components/header/header';
import NewsLetter from './newletter/news';
import NewsDetail from './newletter/newsDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route path="/" exact component={Auth} />
        <Route path="/Newsletter" exact component={NewsLetter} />
        <Route path='/Newsletter/:id' render={(props) => {
          return ( <NewsDetail {...props } /> )
        }} />
      </div>
    </Router>
  );
}

export default App;
