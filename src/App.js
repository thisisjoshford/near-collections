import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react'
import { logout, onSubmit } from './services/utils'
import getConfig from './config'
import { fetchStorage } from './services/api'
import WelcomeScreen from './components/WelcomeScreen'
import AccountData from './components/AccountData'
import './global.css'

const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const [data, setData] = useState()
  const [storage, setStorage] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(
    () => {
      fetchStorage(process.env.CONTRACT_NAME, 'testnet')
        .then(res => {
          setStorage(res)
          console.log(res)
        })
    },[showNotification])

  if (!window.walletConnection.isSignedIn()) return <WelcomeScreen/>

  return (
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>{window.accountId}</h1>
        <form onSubmit={async event => {
          const newKey = event.target.elements.key.value
          const newValue = event.target.elements.value.value
          await onSubmit(event)
          setData(newKey, newValue)
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
          }, 11000)
        }}>
          <fieldset id="fieldset">
            <p> Storing data to account:&nbsp; 
              <a 
                href={`https://explorer.testnet.near.org/accounts/${process.env.CONTRACT_NAME}`}
                target="_blank"
                rel="noreferrer"
              >
                {process.env.CONTRACT_NAME}
              </a>
            </p>
            <div style={{ display: 'flex' }}>
              <input
                autoComplete="off"
                placeholder="key"
                id="key"
                onChange={e => setButtonDisabled(e.target.value === key)}
                style={{ flex: 1 }}
              />             
              <input
                autoComplete="off"
                placeholder="value"
                id="value"
                onChange={e => setButtonDisabled(e.target.value === value)}
                style={{ flex: 1 }}
              />
              <button
                disabled={buttonDisabled}
                style={{ borderRadius: '0 5px 5px 0' }}
              >
                Send
              </button>
            </div>
          </fieldset>
        </form>
        {storage? <AccountData storage={storage}/> : null}
      </main>
      {showNotification && <Notification />}
    </>
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '}
      called method: 'setGreeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
