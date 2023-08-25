import React from 'react';
import { useState, useEffect } from 'react';
import { Card, List, Spin, Typography } from 'antd';
import './App.css'

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
    (async () => {
      let gamesListResponse = await fetch('http://localhost:3002/games');
      let gamesListJson = await gamesListResponse.json();
      setGamesList(gamesListJson);

      console.log(gamesListResponse.status);
      console.log(gamesListJson);
    })();
  }, []);

  let [gamesList, setGamesList] = useState<IGame[]>([]);

  return (
    <>
      {gamesList.length === 0 ? (
        <div className="loading">
          <Spin tip="Loading games..." size='large'>
              <div className="content" />
          </Spin>
        </div>
      ) : (
      <div className="App">
        <Title style={{textAlign: 'center'}}>Games</Title>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 4,
            }}
            pagination={{ position: 'bottom', align: 'center' }}
            dataSource={gamesList}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title} hoverable cover={
                  <img alt={item.title} src={item.thumbnail} />
                }>
                  <Meta description={
                    <>
                      <p>Genre: {item.genre}</p>
                      <p>Release date: {formatDate(item.release_date)}</p>
                      <p>Publisher: {item.publisher}</p>
                    </>
                  }/>
                </Card>
              </List.Item>
            )}
          ></List>
      </div>
      )}
    </>
  );
}

export default App;
