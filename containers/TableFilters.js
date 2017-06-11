import React from 'react'
import PropTypes from 'prop-types'
import { addQueryFilter, modifyQueryFilter, removeQueryFilter } from '../actions/user'
import { connect } from 'react-redux'
import Filter from '../components/Filter'

const FIELDS = [
  { value: 'account_number', text: 'Acct. #' },
  { value: 'first_name', text: 'First Name' },
  { value: 'last_name', text: 'Last Name' }
]

class TableFilters extends React.Component {
  constructor(props) {
    super(props)
    this.addQueryFilter = this.addQueryFilter.bind(this)
    this.modifyQueryFilter = this.modifyQueryFilter.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
  }

  addQueryFilter() {
    this.props.dispatch(addQueryFilter())
  }

  modifyQueryFilter(filter, index) {
    this.props.dispatch(modifyQueryFilter(filter, index))
  }

  removeFilter(index) {
    this.props.dispatch(removeQueryFilter(index))
  }

  render() {
    const { queryFilters } = this.props
    return (
      <div className="table-filters">
        <div>
          <i className="material-icons add-filter"
             title="Add filter"
             onClick={this.addQueryFilter}>add_circle</i>
        </div>
        <div>
          {queryFilters.map((filter, i) => (
            <Filter key={i}
                    filter={filter}
                    fields={FIELDS}
                    onFilterChange={newFilter => this.modifyQueryFilter(newFilter, i)}
                    onRemove={() => this.removeFilter(i)} />
          ))}
        </div>
      </div>
    )
  }
}
TableFilters = connect(({ filters: { queryFilters } }) => ({
  queryFilters
}))(TableFilters)

export default TableFilters
