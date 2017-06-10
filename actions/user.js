export const ADD_QUERY_FILTER = 'ADD_QUERY_FILTER'

export const addQueryFilter = () => ({
  type: ADD_QUERY_FILTER,
  filter: {
    field: 'account_number',
    query: ''
  }
})
