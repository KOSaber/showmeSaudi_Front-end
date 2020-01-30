import React, { Component } from 'react';
import './App.css';

import NavbarMain from './Navbar'
import Footer from './Footer'


class App extends Component {
  render() {


    return (
      <div className='body'>
        
        <NavbarMain />

      
        <Footer/>

      </div>
    );
  }
} 
export default App;