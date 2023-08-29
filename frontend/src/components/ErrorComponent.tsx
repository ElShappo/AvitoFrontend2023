import React from 'react';
import { Typography, Empty } from 'antd';
const { Title } = Typography;

function Error(props: any) {
    return (
        <div className="loading">
            <Empty description={
                <Title level={4} style={{textAlign: 'center'}}>
                    {props.children}
                </Title>
            }>
            </Empty>
        </div>
  )
}

export default Error