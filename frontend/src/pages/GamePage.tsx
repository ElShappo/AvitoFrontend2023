import React, { Suspense, useEffect } from 'react';
import { useLoaderData, Await, useNavigate } from 'react-router-dom';
import { Card, Carousel, Col, Row, Image, Button, Layout } from 'antd';
import { SettingOutlined, ArrowLeftOutlined, FrownOutlined } from '@ant-design/icons';
import Loading from '../components/Loading';
import Error from '../components/Error';
import formatDate from '../utils/formatDate';
import ModalComponent from '../components/ModalComponent';
import './GamePage.css';

const { Meta } = Card;

const GamePage = () => {
  const data: any = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const waitForData = async () => {
      try {
        let json = await data.game;
        for (let key in json) {
          const value = json[key];
          if (typeof value === 'string') {
            document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${5*60*1000}`;
          } else {
            document.cookie = `${encodeURIComponent(key)}=${JSON.stringify(value)}; max-age=${5*60*1000}`;
          }
        }
      } catch (e) {
        console.error('Error occurred while awaiting promise containing info about a game');
        console.error(e);
      }
    }
    waitForData();
  }, [data])

  return (
    <Suspense fallback={<Loading />}>
      <Await
        resolve={data.game}
        errorElement={<Error>Couldn't fetch the game <FrownOutlined /></Error>}
      >
        {(game) => (
          <Layout className='GamePage'>
            <Layout.Header>
              <Button type='primary' icon={<ArrowLeftOutlined />} size='large' onClick={() => navigate(-1)}>To games page</Button>
            </Layout.Header>

            <Layout.Content style={{paddingTop: '1em'}}>
              <Row justify='center' align='middle' style={{height: "100%"}}>
                <Col xs={18} sm={15} md={11} lg={10} xl={7}>
                  {game.platform !== "Web Browser" ? (
                    <Card
                      cover={<img alt={game.title} src={game.thumbnail} />}
                      actions={[
                        // <>
                        //   <ModalComponent title={'Game description'} icon={<ContainerOutlined />}>
                        //     { game.description }
                        //   </ModalComponent>
                        // </>,
                        <>
                          <ModalComponent title={'System requirements'} icon={<SettingOutlined />}>
                            {Object.keys(game.minimum_system_requirements).map(key => (
                                <div>
                                  {key}: {game.minimum_system_requirements[key] || <i>{'<no data>'}</i>}
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
                      // actions={[
                      //   <>
                      //     <ModalComponent title={'Game description'} icon={<ContainerOutlined />}>
                      //       { game.description }
                      //     </ModalComponent>
                      //   </>
                      // ]}
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
                          <Image alt={game.title} src={item.image} fallback='/fallback.png' onError={() => console.error('could not load image')}/>
                        ))}
                    </Carousel>
                      </Image.PreviewGroup>
                  </Card>
                </Col>
              </Row>
            </Layout.Content>
          </Layout>
        )}
      </Await>
    </Suspense>
  )
}

export default GamePage