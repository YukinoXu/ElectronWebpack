import * as React from 'react';
import { Spin } from 'antd';
import ProgressBar from '../ProgressBar/ProgressBar';
import usePollingSummary from '../../hooks/usePollingSummary';
import { TaskContext } from '../../contexts/TaskContext';
import styles from './ProgressPage.module.scss';

export default function ProgressPage() {
  usePollingSummary();
  const { progress } = React.useContext(TaskContext);

  const progressKeys = Object.keys(progress);
  const percents = Object.values(progress);
  const bodyElement = (!percents || percents.length === 0) ? <Spin className={styles.spinner} tip="Loading..." /> :
    percents.map((item, index) => {
      return (
        <ProgressBar
          key={index}
          label={progressKeys[index]}
          percentComplete={(percents[index] * 100).toFixed(2)}
        />
      )
    })

  return (
    <div className={styles.container}>
      {bodyElement}
    </div>
  );
}