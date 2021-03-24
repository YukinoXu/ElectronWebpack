import * as React from 'react';
import { Progress } from 'antd';

const intervalDelay = 100;
const intervalIncrement = 2;

export default function ProgressBar() {
  const [percentComplete, setPercentComplete] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPercentComplete((intervalIncrement + percentComplete) % 100);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  });

  return (
    <Progress percent={percentComplete} />
  );
}