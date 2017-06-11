import React from 'react'
import map from 'lodash/fp/map'
import momentTZ from 'moment-timezone'

const TIME_FORMAT = 'MMM DD, YYYY h:mm:ss a'

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
          <td>{momentTZ(p.created_at).tz('Zulu').format(TIME_FORMAT)}</td>
          <td>{momentTZ(p.udpated_at).tz('Zulu').format(TIME_FORMAT)}</td>
        </tr>
      ))(patients)}
    </tbody>
  </table>
)

export default PatientTable
