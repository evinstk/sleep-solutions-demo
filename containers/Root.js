import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPatients } from '../actions/data'
import TableFilters from '../containers/TableFilters'
import PatientTable from '../containers/PatientTable'
import { sort } from '../actions/user'
import sortBy from 'lodash/fp/sortBy'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.sort = this.sort.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPatients())
  }

  sort(field) {
    const { dispatch } = this.props
    dispatch(sort(field))
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
                <PatientTable />
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
Root = connect(({
  entities: { patients },
  fetching,
  failureMessage,
  filters: { queryFilters },
  sortField
}) => {
  patients = flow(
    sortBy(sortField),
    map(({ field, query }) => filter(p => RegExp(query, 'i').test(p[field])))(queryFilters)
  )(patients)
  return { patients, fetching, failureMessage }
})(Root)

export default Root
