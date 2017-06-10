import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPatients } from '../actions/data'

class Root extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPatients)
  }

  render() {
    return (
      <div>Redux!</div>
    )
  }
}
Root.propTypes = {
  dispatch: PropTypes.func.isRequired
}
Root = connect()(Root)

export default Root
