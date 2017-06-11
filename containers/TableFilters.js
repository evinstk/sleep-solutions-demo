import React from 'react'
import PropTypes from 'prop-types'
import { addQueryFilter, modifyQueryFilter } from '../actions/user'
import { connect } from 'react-redux'
import Filter from '../components/Filter'

class TableFilters extends React.Component {
  constructor(props) {
    super(props)
    this.addQueryFilter = this.addQueryFilter.bind(this)
  }

  addQueryFilter() {
    this.props.dispatch(addQueryFilter())
  }

  modifyQueryFilter(query, index) {
    this.props.dispatch(modifyQueryFilter(query, index))
  }

  render() {
    const { queryFilters } = this.props
    return (
      <div>
        <input type="button" value="Add Query Filter" onClick={this.addQueryFilter} />
        {queryFilters.map(({ query }, i) => (
          <Filter key={i}
                  query={query}
                  onQueryChange={newQuery => this.modifyQueryFilter(newQuery, i)} />
        ))}
      </div>
    )
  }
}
TableFilters = connect(({ filters: { queryFilters } }) => ({
  queryFilters
}))(TableFilters)

export default TableFilters
