import React from 'react'
import { Empty, Row } from 'antd'
import "./NotFound.css";
import Title from 'antd/es/typography/Title';

const NotFound = () => {
  return (
    <Row className="NotFound" justify='center' align='middle'>
      <Empty description={<Title level={3}>Page not found</Title>}/>
    </Row>
  )
}

export default NotFound;