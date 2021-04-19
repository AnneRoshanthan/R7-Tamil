import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './component/GlobelState'
import './App.css';
import Navbar from './component/navbar'

function App() {
  return (
      <DataProvider>
          <Router>
    <div className="App">

  <Navbar />
  
      </div>
      </Router>
      </DataProvider>
  );
}

export default App;
