import 'regenerator-runtime/runtime'
import React from 'react'
import Main from './components/Main'
import SignIn from './components/SignIn'
import './global.css'

export default function App() {
  return(
    //check to see if user is singed in to their NEAR Wallet
    window.walletConnection.isSignedIn() 
      ? <Main/> 
      : <SignIn/>
  )
}
