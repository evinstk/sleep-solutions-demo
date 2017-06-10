import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPatients } from '../actions/data'
import PatientTable from '../components/PatientTable'

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
        <PatientTable patients={patients} />
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
