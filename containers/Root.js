import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import map from 'lodash/fp/map'
import { fetchPatients } from '../actions/data'

class Root extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPatients)
  }

  render() {
    const { patients } = this.props

    return (
      <div>
        <h1>Patients</h1>
        <ul>
          {map(p => <li key={p.account_number}>{p.first_name} {p.last_name}</li>)(patients)}
        </ul>
      </div>
    )
  }
}
Root.propTypes = {
  dispatch: PropTypes.func.isRequired
}
Root = connect(({ entities: { patients } }) => {
  return { patients }
})(Root)

export default Root
