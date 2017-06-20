export const search = (state={}, action) => {
  switch (action.type) {
    case "CHANGE_SEARCH":
      return action.payload.search
    default:
      return state
  }
}

// {
//   assignee:me.id,
//   createdBy:me.id,
//   createdAt:'',
//   dueAt:'',
//   projectId:'',
//   completed:'all',
// }
