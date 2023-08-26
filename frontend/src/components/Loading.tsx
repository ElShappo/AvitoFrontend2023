import React from 'react';
import { Typography, Spin } from 'antd';
const { Title } = Typography;

const Loading = () => {
  return (
    <div className="loading">
        <Spin tip={<Title level={5} style={{textAlign: 'center'}}>Loading games...</Title>} size='large'>
            <div className="content" />
        </Spin>
    </div>
  )
}
export default Loading