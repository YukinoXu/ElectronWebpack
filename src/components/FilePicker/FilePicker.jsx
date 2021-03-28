import * as React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';
import { SET_KEY_FILE } from '../../actions/ActionTypes'; 

export default function FilePicker(props) {
  const { dispatch } = React.useContext(AuthContext);
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        dispatch({
          type: SET_KEY_FILE,
          payload: info.fileList
        });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload key file</Button>
      </Upload>
    </div>
  )
}