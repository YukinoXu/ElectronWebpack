import * as React from 'react';
import { Steps, Button, message } from 'antd';
import LoginFrom from '../LoginForm/LoginForm';
import FileTable from '../FileTable/FileTable';
import ProgressPage from '../ProgressPage/ProgressPage';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { TaskContextProvider } from '../../contexts/TaskContext';

const { Step } = Steps;

export function _MigrationSteps() {
  const [current, setCurrent] = React.useState(0);

  const steps = [
    {
      title: 'Authentication',
      content: <LoginFrom onNextClick={() => next()} />,
    },
    {
      title: 'Select file',
      content: <FileTable onNextClick={() => next()} />,
    },
    {
      title: 'Migration',
      content: <ProgressPage />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
    </div>
  );
}

const MigrationSteps = TaskContextProvider(AuthContextProvider(_MigrationSteps));
export default MigrationSteps;
