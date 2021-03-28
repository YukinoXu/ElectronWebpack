import * as React from 'react';
import styles from './App.module.scss';
import 'antd/dist/antd.css';
import { getConnector } from './data/api';
import MigrationSteps from './components/MigrationSteps/MigrationSteps';

export default function App() {
  // React.useEffect(() => {
  //   getConnector('e1336855-f744-4cdf-bf7a-93805d85ebe6').then((resp) => console.log(resp));
  // }, []);

  return (
    <div className={styles.container}>
      {/* <FileTable />
      <ProgressBar /> */}
      {/* <LoginFrom /> */}
      <MigrationSteps />
    </div>
  );
}
