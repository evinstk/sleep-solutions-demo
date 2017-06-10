import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPatients } from '../actions/data'
import { addQueryFilter } from '../actions/user'
import PatientTable from '../components/PatientTable'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.addQueryFilter = this.addQueryFilter.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPatients())
  }

  addQueryFilter() {
    this.props.dispatch(addQueryFilter())
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
                <input type="button" value="Add Query Filter" onClick={this.addQueryFilter} />
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
