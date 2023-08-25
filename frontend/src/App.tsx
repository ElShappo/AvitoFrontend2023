import React from 'react';
import { useState, useEffect } from 'react';
import { Card, List, Spin, Typography, Empty, Button, Popover, Space, Layout, Pagination } from 'antd';
import './App.css'

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Meta } = Card;

interface IGame {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

function App() {
  function formatDate(rawDate: string) {
    // format date so it matches russian format
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1);  // getMonth() returns number from 0 to 11
    let day = String(date.getDate());

    if (month.length === 1) month = '0' + month; // if there is only one digit, append 0
    if (day.length === 1) day = '0' + day; // if there is only one digit, append 0

    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const timeout = 5000;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        let gamesListResponse = await fetch('http://localhost:3002/games', {signal: controller.signal});
        let gamesListJson = await gamesListResponse.json();
        clearTimeout(timeoutId);
        
        console.log(gamesListResponse.status);
        console.log(gamesListJson);

        setHasError(false);
        setGamesList(gamesListJson);
      } catch (e) {
        console.error(e);
        setHasError(true);
      }
    };
    fetchGames();
  }, []);
  
  let [gamesList, setGamesList] = useState<IGame[]>([]);
  let [hasError, setHasError] = useState(false);
  let [page, setPage] = useState(1);
  let [pageSize, setPageSize] = useState(10);

  if (gamesList.length === 0 && hasError) {
    return (
      <div className="loading">
        <Empty description={
          <Title level={4} style={{textAlign: 'center'}}>Couldn't fetch games :(</Title>
        }>
        </Empty>
      </div>
    )
  } else if (gamesList.length === 0 && !hasError) {
    return (
      <div className="loading">
        <Spin tip={<Title level={5} style={{textAlign: 'center'}}>Loading games...</Title>} size='large'>
            <div className="content" />
        </Spin>
    </div>
    )
  } else {
    return (
      <div className="App">
        <Layout>
          <Header className="mainHeader">
            <Title className="mainTitle">Games</Title>
          </Header>
          <Content>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 4,
              }}
              // pagination={{ position: 'bottom', align: 'center' }}
              dataSource={gamesList.slice((page - 1) * pageSize, page * pageSize)}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.title} hoverable cover={
                    <img alt={item.title} src={item.thumbnail} />
                  }>
                    <Meta description={
                      <div style={{ fontSize: "1.1em" }}>
                        <Space size="small" wrap>
                          <Popover content="genre">
                            <Button type="primary" style={{backgroundColor: "#f50"}} size="small">{item.genre}</Button>
                          </Popover>
                          <Popover content="publisher">
                            <Button type="primary" style={{backgroundColor: "#f50"}} size="small">{item.publisher}</Button>
                          </Popover>
                          <Popover content="release date">
                            <Button type="primary" style={{backgroundColor: "#f50"}} size="small">{formatDate(item.release_date)}</Button>
                          </Popover>
                        </Space>
                      </div>
                    }/>
                  </Card>
                </List.Item>
              )}
            ></List>
          </Content>
          <Footer className="mainFooter" style={{ position: 'sticky', zIndex: 1, bottom: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pagination total={gamesList.length} onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }} />
          </Footer>
        </Layout>
    </div>
    )
  }
}

export default App;
