import React from 'react'
import map from 'lodash/fp/map'
import moment from 'moment'

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
          <td>{moment(p.created_at).format(TIME_FORMAT)}</td>
          <td>{moment(p.udpated_at).format(TIME_FORMAT)}</td>
        </tr>
      ))(patients)}
    </tbody>
  </table>
)

export default PatientTable
