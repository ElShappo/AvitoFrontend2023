import React from 'react';
import { Button, Modal } from 'antd';

const ModalComponent = (props: any) => {
    return (
        <Button icon={props.icon} type="primary" onClick={() => {
            Modal.info({
                centered: true,
                title: props.title,
                content: props.children,
                onOk() {},
          })}
        }>
            {props.title}
        </Button>
    )
}

export default ModalComponent