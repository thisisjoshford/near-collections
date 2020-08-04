import React,  { useEffect, useState } from 'react'
import { fetchStorage } from '../services/api'
import { logout, onSubmit } from '../services/utils'
import AccountState from './AccountState'
import nearLogo from '../assets/logo-white.svg'

export default function Main() {
  const [storage, setStorage] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  useEffect (
    () => {
      fetchStorage(process.env.CONTRACT_NAME, 'testnet')
        .then(res => {
          setStorage(res)
          console.log(res)
        })
    },[showNotification])

  return (
    <div>
      <span style={{ float: 'right' }}>{window.accountId}</span><br/>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <img id="nearLogo" src={nearLogo}/>
        <p id ="accountInfo"> Enter data to be stored in account:{' '}<br/>
          <a 
            href={`https://explorer.testnet.near.org/accounts/${process.env.CONTRACT_NAME}`}
            target="_blank"
            rel="noreferrer"
          >
            {process.env.CONTRACT_NAME}
          </a>
        </p>
        <form onSubmit={async event => {
          await onSubmit(event)
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
          }, 11000)
        }}>
          <fieldset id="fieldset">
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
        {storage?.length > 0 ? <AccountState storage={storage}/> : null}
      </main>
      {showNotification && <Notification />}
    </div>
  )
}
