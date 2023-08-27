import React, { Suspense, useState } from 'react';
import { useParams, useLoaderData, Await, useAsyncValue } from 'react-router-dom';
import { Card, Carousel, Col, Layout, Row, Image, Typography, Button, Modal } from 'antd';
import { EditOutlined, CameraOutlined, SettingOutlined, ContainerOutlined } from '@ant-design/icons';
import Loading from '../components/Loading';
import Error from '../components/Error';
import formatDate from '../utils/formatDate';
import ModalComponent from '../components/ModalComponent';
import './GamePage.css';

const { Meta } = Card;
const { Content } = Layout;
const { Title } = Typography;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const GamePage = () => {
  let { id } = useParams();
  const game = useAsyncValue();
  console.log(game);
  const data: any = useLoaderData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Await
        resolve={data.game}
        errorElement={<Error />}
      >
        {(game) => (
          <Row className='GamePage' justify='center' align='middle'>
            <Col xs={18} sm={15} md={11} lg={10} xl={7}>
              {/* <Card
                title={game.title}
                hoverable
                cover={<img alt={game.title} src={game.thumbnail} />}
              >
                <Title>Developer: {game.developer}</Title>
                <Title>Released: {game.release_date}</Title>
                <Carousel autoplay autoplaySpeed={4000}>
                    {game.screenshots.map((item: any) => (
                      <Image alt={game.title} src={item.image} height='200px'/>
                    ))}
                </Carousel>
              </Card> */}
                <Card
                  cover={<img alt={game.title} src={game.thumbnail} />}
                  actions={[
                    <>
                      <ModalComponent title={'Game description'} icon={<ContainerOutlined />}>
                        { game.description }
                      </ModalComponent>
                    </>,
                    <>
                      <ModalComponent title={'System requirements'} icon={<SettingOutlined />}>
                        {Object.keys(game.minimum_system_requirements).map(key => (
                            <div>
                              {key}: {game.minimum_system_requirements[key]}
                            </div>
                        ))}
                      </ModalComponent>
                    </>,
                  ]}
                >
                  <Meta
                    title={game.title}
                    description={
                      <div>
                        <div><b>Genre:</b> <i>{game.genre}</i></div>
                        <div><b>Released in</b> <i>{formatDate(game.release_date)}</i></div>
                        <div><b>Published by</b> <i>{game.publisher}</i></div>
                        <div><b>Developed by</b> <i>{game.developer}</i></div>
                      </div>
                  }
                  />
                </Card>
            </Col>
            <Col xs={18} sm={15} md={{span: 11, offset: 1}} lg={{span: 10, offset: 1}} xl={{span: 7, offset: 1}}>
              <Card title="Screenshots" bordered={false}>
                <Carousel autoplay autoplaySpeed={4000}>
                    {game.screenshots.map((item: any) => (
                      <Image alt={game.title} src={item.image} />
                    ))}
                </Carousel>
              </Card>
            </Col>
          </Row>
        )}
      </Await>
    </Suspense>
    // <div>GamePage with id = {id}</div>
  )
}

export default GamePage