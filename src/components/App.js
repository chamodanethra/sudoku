import React, {Component} from 'react';
import { connect } from 'react-redux';

import './App.css';
import Grid from './Grid';
import Particles from 'react-particles-js';
import Button from './Button';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}

class App extends Component{

  render(){
    return(
        <div className='main'>
          <Particles className='particles'
                params={ particlesOptions }
          />
          <Grid/>
          <Button/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    isClicked: state.isClicked,
  };
}

export default connect(mapStateToProps)(App);