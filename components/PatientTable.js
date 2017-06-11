import React from 'react'
import map from 'lodash/fp/map'
import momentTZ from 'moment-timezone'

const TIME_FORMAT = 'MMM DD, YYYY h:mm:ss a'

class PatientTable extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(field) {
    const { onFieldClick } = this.props
    if (onFieldClick) {
      onFieldClick(field)
    }
  }

  render() {
    const { patients } = this.props
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => this.handleClick('account_number')}>Acct. #</th>
            <th onClick={() => this.handleClick('last_name')}>Last Name</th>
            <th onClick={() => this.handleClick('first_name')}>First Name</th>
            <th onClick={() => this.handleClick('created_at')}>Created</th>
            <th onClick={() => this.handleClick('udpated_at')}>Updated</th>
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
  }
}

export default PatientTable
