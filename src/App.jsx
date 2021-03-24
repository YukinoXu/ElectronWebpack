import * as React from 'react';
import ProgressBar from './components/ProgressBar/ProgressBar';
import LoginFrom from './components/LoginForm/LoginForm';
import styles from './App.module.scss';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <div className={styles.container}>
      <ProgressBar />
      <LoginFrom />
    </div>
  );
}