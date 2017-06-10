import React from 'react'
import map from 'lodash/fp/map'

const PatientTable = ({ patients }) => (
  <table>
    <thead>
      <tr>
        <th>Acct. #</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Created</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      {map(p => (
        <tr key={p.account_number}>
          <td>{p.account_number}</td>
          <td>{p.last_name}</td>
          <td>{p.first_name}</td>
          <td>{p.created_at}</td>
          <td>{p.udpated_at}</td>
        </tr>
      ))(patients)}
    </tbody>
  </table>
)

export default PatientTable
