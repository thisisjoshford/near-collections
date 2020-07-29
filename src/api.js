export const fetchStorage = (account, network = "testnet") => {

  const URL = `https://rpc.${network}.near.org`

  return fetch(`${URL}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_state",
        finality: "final",
        account_id: account,
        prefix_base64: "",
      },
    })
  })
  .then(res => res.json())
  .then(body => body.result.values.map(value => ({
    key: atob(value.key),
    value: atob(value.value)
  })))
}