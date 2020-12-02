import React from 'react';
import infoIcon from '../assets/info.png';
import { login } from '../services/utils';

export default function WelcomeScreen() {
  return (
    <main>
      <h1>Key-Value Store</h1>
      <h3>
          Lets store some data on the blockchain! 
      </h3>
      <p id="signInButton">
        <button onClick={login}>Sign in</button>
      </p>
      <div className="tooltip">
        <img id="infoIcon" src={infoIcon}></img>
        <span className="tooltiptext">
          To get started you will need to sign in using NEAR Wallet with an existing account or create a new one using the button above.
        </span>
      </div>
    </main>
  );
}
