import { combineReducers } from 'redux'
import { REQUEST_PATIENTS, RECEIVE_PATIENTS, FAILURE_PATIENTS } from '../actions/data'
import mergeAll from 'lodash/fp/mergeAll'

const entities = (state = {
  patients: {}
}, action) => {
  if (action.response && action.response.entities) {
    return mergeAll([state, action.response.entities])
  }
  return state
}

const fetching = (state = false, action) => {
  switch (action.type) {
  case REQUEST_PATIENTS:
    return true
  case RECEIVE_PATIENTS:
    return false
  case FAILURE_PATIENTS:
    return false
  default:
    return state
  }
}

const failureMessage = (state = null, action) => {
  switch (action.type) {
  case RECEIVE_PATIENTS:
    return null // maybe on retry
  case FAILURE_PATIENTS:
    return action.response.message
  default:
    return state
  }
}

const rootReducer = combineReducers({
  entities,
  fetching,
  failureMessage
})

export default rootReducer
