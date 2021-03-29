import * as React from 'react';
import useInterval from './useInterval';
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';
import { getProjectProgress } from '../data/api';
import { SET_PROGRESS } from '../actions/ActionTypes';

const POLLING_INTERVAL = 1 * 1000;

export default function usePollingSummary() {
  const { projectId } = React.useContext(AuthContext);
  const { dispatch: taskDispatch } = React.useContext(TaskContext);
  useInterval(callback, POLLING_INTERVAL);

  React.useEffect(() => {
    callback();
  }, []);

  async function callback() {
    getProjectProgress(projectId).then((resp) => {
      console.log(resp);
      taskDispatch({
        type: SET_PROGRESS,
        payload: resp
      });
    })
  }
}