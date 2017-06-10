import { combineReducers } from 'redux'
import { RECEIVE_PATIENTS } from '../actions/data'
import mergeAll from 'lodash/fp/mergeAll'

const entities = (state = {
  patients: {}
}, action) => {
  if (action.response && action.response.entities) {
    return mergeAll([state, action.response.entities])
  }
  return state
}

const rootReducer = combineReducers({
  entities
})

export default rootReducer
