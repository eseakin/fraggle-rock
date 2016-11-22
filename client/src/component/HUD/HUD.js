import React from 'react';
import { browserHistory } from 'react-router';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');

class HUD extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    players: null,
      liveMatches: []
	  };

  }

  render() {
    return (
      <div id="screenOverlay">
        <div id="HUD">

          <div class="playerBoxContainer">
            <div class="player1 playerBox" id="player1Box">
              <img src="./textures/playerRedHealth.png" class="playerPic" />
              <div class="playerLives">
                <img class="player1 life3" src="./textures/playerhealthheart.png" />
                <img class="player1 life2" src="./textures/playerhealthheart.png" />
                <img class="player1 life1" src="./textures/playerhealthheart.png" />
              </div>
              <div class="player1 playerNameBox">
                <div class="playerName" id="player1Name">Player 1</div>
              </div>
            </div>

            <div class="player2 playerBox" id="player2Box">
              <img src="./textures/playerBlueHealth.png" class="playerPic" />
              <div class="playerLives">
                <img class="player2 life3" src="./textures/playerhealthheart.png" />
                <img class="player2 life2" src="./textures/playerhealthheart.png" />
                <img class="player2 life1" src="./textures/playerhealthheart.png" />
              </div>
              <div class="player2 playerNameBox">
                <div class="playerName" id="player2Name">Player 2</div>
              </div>
            </div>

            <div class="player3 playerBox" id="player3Box">
              <img src="./textures/playerGreenHealth.png" class="playerPic" />
              <div class="playerLives">
                <img class="player3 life3" src="./textures/playerhealthheart.png" />
                <img class="player3 life2" src="./textures/playerhealthheart.png" />
                <img class="player3 life1" src="./textures/playerhealthheart.png" />
              </div>
              <div class="player3 playerNameBox">
                <div class="playerName" id="player3Name">Player 3</div>
              </div>
            </div>

            <div class="player4 playerBox" id="player4Box">
              <img src="./textures/playerPinkHealth.png" class="playerPic" />
              <div class="playerLives">
                <img class="player4 life3" src="./textures/playerhealthheart.png" />
                <img class="player4 life2" src="./textures/playerhealthheart.png" />
                <img class="player4 life1" src="./textures/playerhealthheart.png" />
              </div>
              <div class="player4 playerNameBox">
                <div class="playerName" id="player4Name">Player 4</div>
              </div>
            </div>

          </div>

          <div class="crosshairContainer">
            <div class="jumpBox">
              <div id="jump3"></div>
              <div id="jump2"></div>
              <div id="jump1"></div>
            </div>
            <img id="crosshair" src="./textures/crosshair.png" />
            <div class="ammoBox">
              <div id="ammo3"></div>
              <div id="ammo2"></div>
              <div id="ammo1"></div>
            </div>
          </div>
        </div>

        <div id="menuContainer">
          <div class="menu-title"><img src='./textures/logo.png'/></div>
          <div class="menu">
            <div>
              <div class="menu-name">MENU</div>
              <div id="resume" class="resume">PLAY</div>
              <div class='exit'>EXIT</div>
              <div class='menu-descr'> Press ~ In Game To See Menu</div>
            </div>
          </div>
          <div class="version">v0.7</div>
          <div class="createdBy">Created by Nick Lathen, Will Stockman, Eric Eakin, and Riyaz Ahmed, 2016</div>

        </div>
      </div>
    );

  }
}

export default HUD;