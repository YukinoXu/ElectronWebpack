import * as React from 'react';
import { Label } from '@fluentui/react';
import { Progress } from 'antd';

export default function ProgressBar(props) {
  return (
    <div>
      <Label>{props.label}</Label>
      <Progress percent={props.percentComplete || 0} />
    </div>
  );
}