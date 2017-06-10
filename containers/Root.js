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
    const { fetching, patients } = this.props

    return (
      <div>
        <h1>Patients</h1>
        {
          fetching ?
            <div>Getting patient data</div> :
            <PatientTable patients={patients} />
        }
      </div>
    )
  }
}
Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
}
Root = connect(({ entities: { patients }, fetching }) => {
  return { patients, fetching }
})(Root)

export default Root
