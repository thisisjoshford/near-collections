import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from '../config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
  window.walletConnection = new WalletConnection(near)
  window.accountId = window.walletConnection.getAccountId()
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    viewMethods: ['getData'],
    changeMethods: ['setData'],
  })
}

export async function onSubmit(event) {
  event.preventDefault()
  const { fieldset, key, value } = event.target.elements
  console.log(key.value, value.value)

  // disable the form while the value gets updated on-chain
  fieldset.disabled = true

  try {
    await contract.setData({
      key: key.value,
      value: value.value
    })
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  } finally {
    // re-enable the form, whether the call succeeded or failed
    fieldset.disabled = false
  }
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}
