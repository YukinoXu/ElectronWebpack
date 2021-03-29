import * as React from 'react';
import { Table, Button, Spin } from 'antd';
import styles from './FileTable.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { TaskContext } from '../../contexts/TaskContext';
import { getItems, createProjects } from '../../data/api';
import { SET_JOBS, SET_SELECTED_TASKS, SET_PROJECT_ID } from '../../actions/ActionTypes';

const columns = [
  {
    title: 'File Name',
    dataIndex: 'name',
  }
];

export default function FileTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [data, setData] = React.useState([]);
  const { sourceConnectorId, destConnectorId, jobs, dispatch } = React.useContext(AuthContext);
  const { dispatch: taskDispatch, selectedTasks } = React.useContext(TaskContext);
  const [loading, setLoading] = React.useState(false);
  const hasSelected = selectedRowKeys.length > 0;

  React.useEffect(() => {
    if (sourceConnectorId !== null) {
      getItems(sourceConnectorId).then((resp) => {
        const files = resp.map((item, index) => (
          {
            key: index,
            name: item.path
          }
        ));
        setData(files);
        const jobs = resp.map((item) => ({
          path: item.path
        }));
        dispatch({
          type: SET_JOBS,
          payload: jobs
        });
      }).catch((error) => console.log(error));
    }
  }, [sourceConnectorId]);

  function onSelectChange(selectedKeys) {
    setSelectedRowKeys(selectedKeys);
    const selectedJobs = selectedKeys.map((key) => jobs[key]);
    console.log(selectedJobs);
    taskDispatch({
      type: SET_SELECTED_TASKS,
      payload: selectedJobs
    })
  }

  function onMigrationClick() {
    createProjects(sourceConnectorId, destConnectorId, selectedTasks)
      .then((resp) => {
        dispatch({
          type: SET_PROJECT_ID,
          payload: resp.id
        });
      })
      .catch((error) => console.log(error));
    props.onNextClick();
  }

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <div className={styles.table}>
      {data.length === 0 ? <Spin tip="Loading..." className={styles.spinner} />
        :
        <Table
          rowSelection={{selectedRowKeys, onChange: onSelectChange}}
          columns={columns}
          dataSource={data}
        />}
      </div>
      <Button type="primary" onClick={onMigrationClick} disabled={selectedRowKeys.length === 0} loading={loading}>
        Migrate
      </Button>
    </div>
  );  
}