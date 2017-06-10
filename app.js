import React from 'react'
import ReactDOM from 'react-dom'
import { fetchPatients } from './actions/data'

fetchPatients(action => console.log(action))

ReactDOM.render(
  <div>Sleep Solutions Demo</div>,
  document.getElementById('root')
)
