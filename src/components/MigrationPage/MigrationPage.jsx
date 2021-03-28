import * as React from 'react';
import { Button } from 'antd';
import { createProjects, getProjectProgress } from '../../data/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function MigrationPage() {
  const { sourceConnectorId, destConnectorId, jobs } = React.useContext(AuthContext);
  function onMigrationClick() {
    createProjects(sourceConnectorId, destConnectorId, jobs)
      .then((resp) => {
        getProjectProgress(resp.id)
          .then((progress) => {
            console.log(progress)
          });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Button type="primary" onClick={onMigrationClick} disabled={selectedRowKeys.length === 0} loading={loading}>
        Migrate
      </Button>
    </div>
  );
}