import React from 'react'
import map from 'lodash/fp/map'

const PatientTable = ({ patients }) => (
  <ul>
    {map(p => <li key={p.account_number}>{p.first_name} {p.last_name}</li>)(patients)}
  </ul>
)

export default PatientTable
