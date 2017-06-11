import React from 'react'
import PropTypes from 'prop-types'

class Filter extends React.Component {

  constructor(props) {
    super(props)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(key, event) {
    this.props.onFilterChange({
      ...this.props.filter,
      [key]: event.target.value
    })
  }

  handleFieldChange(event) {
    this.handleChange('field', event)
  }

  handleQueryChange(event) {
    this.handleChange('query', event)
  }

  handleRemove(event) {
    this.props.onRemove();
  }

  render() {
    const { filter, fields } = this.props
    return (
      <div className="filter">
        <select value={filter.field} onChange={this.handleFieldChange}>
          {fields.map((f, i) => (
            <option key={i}
                    value={f.value}>
              {f.text}
            </option>
          ))}
        </select>
        <input className="query" type="text" value={filter.query} onChange={this.handleQueryChange} />
        <i className="material-icons remove-filter"
           title="Remove filter"
           onClick={this.handleRemove}>remove_circle</i>
      </div>
    )
  }
}
Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default Filter
