import keyBy from 'lodash/fp/keyBy'
export const REQUEST_PATIENTS = 'REQUEST_PATIENTS'
export const RECEIVE_PATIENTS = 'RECEIVE_PATIENTS'
export const FAILURE_PATIENTS = 'FAILURE_PATIENTS'

const requestPatients = () => ({
  type: REQUEST_PATIENTS
})

const receivePatients = patients => ({
  type: RECEIVE_PATIENTS,
  response: {
    entities: {
      patients
    }
  }
})

const failurePatients = message => ({
  type: FAILURE_PATIENTS,
  response: { message }
})

export const fetchPatients = () => dispatch => {
  dispatch(requestPatients())
  return fetch('https://sleepcoach.us/api/demo?id=demo', {
    method: 'get',
    headers: {
      key: 'eu9q83udjfaa93483DDFJfe23edsac'
    }
  })
    .then(r => r.json())
    .then(response => {
      if (response.success) {
        const patients = keyBy('account_number')(response.patients)
        dispatch(receivePatients(patients))
      } else {
        throw Error(response.message)
      }
    })
    .catch(err => dispatch(failurePatients(err.message)))
}
