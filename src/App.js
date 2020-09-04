import React from 'react';
import './App.css';
import Auth from './components/auth/auth';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Auth/>
    </div>
  );
}

export default App;
