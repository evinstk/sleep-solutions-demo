import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import configureStore from './store/configureStore'
import { fetchPatients } from './actions/data'

const store = configureStore()

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
Root = connect()(Root)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
