import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPatients } from '../actions/data'
import TableFilters from '../containers/TableFilters'
import PatientTable from '../components/PatientTable'

class Root extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPatients())
  }

  render() {
    const { fetching, patients, failureMessage } = this.props

    return (
      <div>
        <h1>Patients</h1>
        {
          fetching ?
            <div>Getting patient data</div> :
            failureMessage ?
              <div>Sorry, an error occurred: {failureMessage}</div> :
              <div>
                <TableFilters />
                <PatientTable patients={patients} />
              </div>
        }
      </div>
    )
  }
}
Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  failureMessage: PropTypes.string
}
Root = connect(({ entities: { patients }, fetching, failureMessage }) => {
  return { patients, fetching, failureMessage }
})(Root)

export default Root
