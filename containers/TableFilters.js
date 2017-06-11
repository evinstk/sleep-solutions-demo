import React from 'react'
import PropTypes from 'prop-types'
import { addQueryFilter } from '../actions/user'
import { connect } from 'react-redux'

class TableFilters extends React.Component {
  constructor(props) {
    super(props)
    this.addQueryFilter = this.addQueryFilter.bind(this)
  }

  addQueryFilter() {
    this.props.dispatch(addQueryFilter())
  }

  render() {
    return (
      <input type="button" value="Add Query Filter" onClick={this.addQueryFilter} />
    )
  }
}
TableFilters = connect()(TableFilters)

export default TableFilters
