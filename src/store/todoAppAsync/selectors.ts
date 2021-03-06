import { Todo } from "domain/models/Todo"
import { State } from "./reducers"

export const filterTodoList = (state: State): Todo[] => {
  if (state.visibilityFilter === "all") {
    return state.todoList
  }
  return state.todoList.filter((t) => t.status === state.visibilityFilter)
}

export const isSomeLoading = (state: State): boolean => {
  return Object.values(state.isLoading).some((isLoading) => isLoading)
}
