import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import { logout, onSubmit } from './utils'
import './global.css'

import getConfig from './config'
import { fetchStorage } from './api'

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

  const storageData = storage?.map(value => (
    <tr>
      <td>{value.key}</td>
      <td>{value.value}</td>
    </tr>
  ))

  return (
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: 'var(--secondary)',
              borderBottom: '2px solid var(--secondary)'
            }}
          >
          </label>
          {' '}
          {window.accountId}!
        </h1>
        <form onSubmit={async event => {
          const newKey = event.target.elements.key.value
          const newValue = event.target.elements.value.value
          await onSubmit(event)

          // update local `greeting` variable to match persisted value
          setData(newKey, newValue)

          // show Notification
          setShowNotification(true)

          // remove Notification again after css animation completes
          // this allows it to be shown again next time the form is submitted
          setTimeout(() => {
            setShowNotification(false)
          }, 11000)
        }}>
          <fieldset id="fieldset">
            <label
              htmlFor="greeting"
              style={{
                display: 'block',
                color: 'var(--gray)',
                marginBottom: '0.5em'
              }}
            >
              Enter new data: {process.env.CONTRACT_NAME}
            </label>
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
                Save
              </button>
            </div>
          </fieldset>
        </form>
        <table>
          <tr>
            <th>KEY</th>
            <th>VALUE</th>
          </tr>
          {storageData}
        </table>
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
