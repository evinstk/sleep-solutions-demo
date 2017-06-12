import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import toArray from 'lodash/toArray'
import flatten from 'lodash/flatten'
import SortTable from '../components/SortTable'
import momentTZ from 'moment-timezone'

const TIME_FORMAT = 'MMM DD, YYYY h:mm:ss a'
const timeDisplay = time => momentTZ(time).tz('Zulu').format(TIME_FORMAT)

const COLUMNS = [
  { key: 'account_number', text: 'Acct. #' },
  { key: 'last_name', text: 'Last Name' },
  { key: 'first_name', text: 'First Name' },
  { key: 'created_at', text: 'Created', display: timeDisplay },
  { key: 'udpated_at', text: 'Updated', display: timeDisplay },
]

class PatientTable extends React.Component {
  render() {
    const { patients } = this.props
    return <SortTable columns={COLUMNS} rows={patients} />
  }
}

PatientTable.propTypes = {
  patients: PropTypes.array.isRequired
}

PatientTable = connect(({
  entities: { patients },
  filters: { queryFilters }
}) => {
  patients = flow(flatten([
    toArray,
    map(({ field, query }) => filter(p => RegExp(query, 'i').test(p[field])))(queryFilters)
  ]))(patients)
  return { patients }
})(PatientTable)

export default PatientTable
