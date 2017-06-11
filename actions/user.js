export const ADD_QUERY_FILTER = 'ADD_QUERY_FILTER'

export const addQueryFilter = () => ({
  type: ADD_QUERY_FILTER,
  filter: {
    field: 'account_number',
    query: ''
  }
})

export const MODIFY_QUERY_FILTER = 'MODIFY_QUERY'

export const modifyQueryFilter = (filter, index) => ({
  type: MODIFY_QUERY_FILTER,
  filter,
  index
})
