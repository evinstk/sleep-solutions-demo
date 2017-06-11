import { combineReducers } from 'redux'
import { REQUEST_PATIENTS, RECEIVE_PATIENTS, FAILURE_PATIENTS } from '../actions/data'
import { ADD_QUERY_FILTER, MODIFY_QUERY_FILTER } from '../actions/user'
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

const queryFilters = (state = [], action) => {
  switch (action.type) {
  case ADD_QUERY_FILTER:
    return [...state, action.filter]
  case MODIFY_QUERY_FILTER:
    const { index, query } = action
    const queries = [...state]
    queries[index] = { ...queries[index], query }
    return queries
  default:
    return state
  }
}

const filters = combineReducers({
  queryFilters
})

const rootReducer = combineReducers({
  entities,
  fetching,
  failureMessage,
  filters
})

export default rootReducer
