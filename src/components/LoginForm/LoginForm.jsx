import * as React from 'react';
import { Form, Input, Button } from 'antd';
import FilePicker from '../FilePicker/FilePicker';
import styles from './LoginForm.module.scss';
import { createSourceConnector, createDestConnector } from '../../data/api';
import { SOURCE_AZURE_BLOB, DEST_AZURE_BLOB } from '../../common/Constants';
import { SET_CONNECTION_STRING, SET_SOURCE_CONNECTOR_ID, SET_DEST_CONNECTOR_ID, SET_CONTAINER_NAME } from '../../actions/ActionTypes';
import { AuthContext } from '../../contexts/AuthContext';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function LoginForm() {
  const { dispatch } = React.useContext(AuthContext);

  const onFinish = (values) => {
    dispatch({
      type: SET_CONNECTION_STRING,
      payload: values.connectionString
    });

    createSourceConnector(SOURCE_AZURE_BLOB, values.connectionString)
      .then((resp) => {
        dispatch({
          type: SET_SOURCE_CONNECTOR_ID,
          payload: resp.id
        });
      })
      .catch((error) => {
        console.log(error);
      });

    createDestConnector(DEST_AZURE_BLOB, values.connectionString)
      .then((resp) => {
        dispatch({
          type: SET_DEST_CONNECTOR_ID,
          payload: resp.id
        });
      })
      .catch((error) => {
        console.log(error);
      });
    
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Connection String"
          name="connectionString"
          rules={[
            {
              required: true,
              message: 'Please input your connection string!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          {...tailLayout}
        >
          <FilePicker />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Authenticate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
