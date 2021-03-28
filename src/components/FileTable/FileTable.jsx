import * as React from 'react';
import { Table, Button } from 'antd';
import styles from './FileTable.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { getItems } from '../../data/api';
import { SET_JOBS } from '../../actions/ActionTypes';

const columns = [
  {
    title: 'File Name',
    dataIndex: 'name',
  }
];

export default function FileTable() {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [data, setData] = React.useState([]);
  const { sourceConnectorId, jobs, dispatch } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const hasSelected = selectedRowKeys.length > 0;

  React.useEffect(() => {
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
  }, [sourceConnectorId]);

  function onSelectChange(selectedKeys) {
    setSelectedRowKeys(selectedKeys);
  }

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        rowSelection={{selectedRowKeys, onChange: onSelectChange}}
        columns={columns}
        dataSource={data}
      />
      {/* <Button type="primary" onClick={() => console.log('start!!!')} disabled={selectedRowKeys.length === 0} loading={loading}>
        Migrate
      </Button> */}
    </div>
  );  
}