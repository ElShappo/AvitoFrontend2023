import React from 'react';
import { Typography, Empty } from 'antd';
const { Title } = Typography;

function Error() {
    return (
        <div className="loading">
            <Empty description={
                <Title level={4} style={{textAlign: 'center'}}>Couldn't fetch games :(</Title>
            }>
            </Empty>
        </div>
  )
}

export default Error