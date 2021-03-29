import * as React from 'react';
import { SET_SELECTED_TASKS, SET_PROGRESS } from '../actions/ActionTypes';

const initState = {
  selectedTasks: [],
  progress: {}
}

export const TaskContext = React.createContext(undefined);

function reducer(state, action) {
  switch (action.type) {
    case SET_SELECTED_TASKS:
      return {
        ...state,
        selectedTasks: action.payload
      };
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload
      };
    default:
      return state;
  }
}

export function TaskContextProvider(Children) {
  function Provider(props) {
    const [{ selectedTasks, progress }, dispatch] = React.useReducer(reducer, initState);
    return (
      <TaskContext.Provider value={{ selectedTasks, progress, dispatch }}>
        <Children {...props} />
      </TaskContext.Provider>
    );
  }
  return Provider;
}
