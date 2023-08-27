import React, { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import { Card, Carousel, Col, Row, Image } from 'antd';
import { SettingOutlined, ContainerOutlined } from '@ant-design/icons';
import Loading from '../components/Loading';
import Error from '../components/Error';
import formatDate from '../utils/formatDate';
import ModalComponent from '../components/ModalComponent';
import './GamePage.css';

const { Meta } = Card;

const GamePage = () => {
  const data: any = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await
        resolve={data.game}
        errorElement={<Error />}
      >
        {(game) => (
          <Row className='GamePage' justify='center' align='middle'>
            <Col xs={18} sm={15} md={11} lg={10} xl={7}>
              {game.platform !== "Web Browser" ? (
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
              ) : (
                <Card
                  cover={<img alt={game.title} src={game.thumbnail} />}
                  actions={[
                    <>
                      <ModalComponent title={'Game description'} icon={<ContainerOutlined />}>
                        { game.description }
                      </ModalComponent>
                    </>
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
              )}
            </Col>

            <Col xs={18} sm={15} md={{span: 11, offset: 1}} lg={{span: 10, offset: 1}} xl={{span: 7, offset: 1}}>
              <Card title="Screenshots" bordered={false}>
                  <Image.PreviewGroup>
                <Carousel autoplay autoplaySpeed={4000} infinite={false}>
                    {game.screenshots.map((item: any) => (
                      <Image alt={game.title} src={item.image} fallback='/fallback.png' onError={() => console.error('error!')}/>
                    ))}
                </Carousel>
                  </Image.PreviewGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Await>
    </Suspense>
  )
}

export default GamePage