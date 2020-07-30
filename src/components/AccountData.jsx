import React from 'react'

export default function AccountData({ storage }) {
  const storageElements = storage?.map((value, i) => (
    <tr key={i}>
      <td>{value.key}</td>
      <td>{value.value}</td>
    </tr>
  ))

  return (
        <table>
        <thead>
          <tr>
            <th>KEY</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
          {storageElements}
        </tbody>
      </table>
  )
}
