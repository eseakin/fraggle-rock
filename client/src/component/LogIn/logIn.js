import React from 'react';
import Home from '../Home/Home.js'
import FacebookLogin from 'react-facebook-login'
import { browserHistory } from 'react-router';

class LogIn extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  };
    this.responseFacebook = this.responseFacebook.bind(this)
  }
  componentClicked(e) {
  }
  
  playAsGuest() {
    browserHistory.push('/Home')
  }

  responseFacebook(e) {
    //save username and userId on local storage

    //send request to server with username and id


    this.setState({ user: true })
      if(e.name) {
        browserHistory.push('/Home') 
      }
    
  }

  render() {
      return (
        <div>
        <div id='LogIn'>
          <div id='Facebook'>
            <FacebookLogin
                appId="1709766049351226"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
            />
            <button onClick={this.playAsGuest} id='GuestLogIn'>Play As Guest</button>
          </div>
          <img id='LogInPageLogo' src="../../../textures/LogInPageLogo.jpg" />
        </div>
        </div>
      );  
  	
  }
}



export default LogIn;