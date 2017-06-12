import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/fp/sortBy'

class SortTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = { sortIndex: 0 }
    this.sortColumn = this.sortColumn.bind(this)
  }

  sortColumn(sortIndex) {
    this.setState(() => ({ sortIndex }))
  }

  render() {
    const { columns, rows } = this.props
    const { sortIndex } = this.state
    const sortedRows = sortBy(columns[sortIndex].key)(rows)
    return (
      <table className="sort-table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}
                  onClick={() => this.sortColumn(i)}
                  className={i === sortIndex ? 'sort-column' : ''}>{c.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {sortedRows.map((r, ri) => (
          <tr key={ri}>
            {columns.map((c, ci) => (
              <td key={ci}>{c.display ? c.display(r[c.key]) : r[c.key]}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}

SortTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
}

export default SortTable
