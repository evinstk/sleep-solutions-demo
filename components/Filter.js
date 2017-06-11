import React from 'react'
import PropTypes from 'prop-types'

class Filter extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onQueryChange(event.target.value)
  }

  render() {
    const { query } = this.props
    return (
      <input type="text" value={query} onChange={this.handleChange} />
    )
  }
}
Filter.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired
}

export default Filter
