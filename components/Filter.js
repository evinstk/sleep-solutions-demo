import React from 'react'
import PropTypes from 'prop-types'

class Filter extends React.Component {

  constructor(props) {
    super(props)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
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

  render() {
    const { filter, fields } = this.props
    return (
      <div>
        <select value={filter.field} onChange={this.handleFieldChange}>
          {fields.map((f, i) => (
            <option key={i}
                    value={f.value}>
              {f.text}
            </option>
          ))}
        </select>
        <input type="text" value={filter.query} onChange={this.handleQueryChange} />
      </div>
    )
  }
}
Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired
}

export default Filter
