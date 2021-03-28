import * as React from 'react';
import { SET_CONNECTION_STRING, SET_SOURCE_CONNECTOR_ID, SET_DEST_CONNECTOR_ID, SET_CONTAINER_NAME, SET_KEY_FILE, SET_PROJECT_ID, SET_JOBS } from '../actions/ActionTypes';

const initState = {
  sourceConnectorId: null,
  destConnectorId: null,
  projectId: null,
  connectionString: null,
  containerName: null,
  keyFile: null,
  jobs: []
}

export const AuthContext = React.createContext(undefined);

function reducer(state, action) {
  switch (action.type) {
    case SET_SOURCE_CONNECTOR_ID:
      return {
        ...state,
        sourceConnectorId: action.payload
      };
    case SET_DEST_CONNECTOR_ID:
      return {
        ...state,
        destConnectorId: action.payload
      };
    case SET_PROJECT_ID:
      return {
        ...state,
        projectId: action.payload
      };
    case SET_CONNECTION_STRING:
      return {
        ...state,
        connectionString: action.payload
      };
    case SET_CONTAINER_NAME:
      return {
        ...state,
        containerName: action.payload
      };
    case SET_KEY_FILE:
      return {
        ...state,
        keyFile: action.payload
      };
    case SET_JOBS:
      return {
        ...state,
        jobs: action.payload
      };
    default:
      return state;
  }
}

export function AuthContextProvider(Children) {
  function Provider(props) {
    const [{ sourceConnectorId, destConnectorId, projectId, connectionString, containerName, keyFile, jobs }, dispatch] = React.useReducer(reducer, initState);
    return (
      <AuthContext.Provider value={{ sourceConnectorId, destConnectorId, projectId, connectionString, containerName, keyFile, jobs, dispatch }}>
        <Children {...props} />
      </AuthContext.Provider>
    );
  }
  return Provider;
}
