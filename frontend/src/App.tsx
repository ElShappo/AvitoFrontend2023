import React from 'react';
import { useState, useEffect } from 'react';
import { Card, List, Spin } from 'antd';

interface IGame {
  "id": number;
  "title": string;
  "thumbnail": string;
  "short_description": string;
  "game_url": string;
  "genre": string;
  "platform": string
  "publisher": string;
  "developer": string;
  "release_date": string;
  "freetogame_profile_url": string;
}

function App() {
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
    <div className="App">
      {gamesList.length !== 0 ? (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={gamesList}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        ></List>
      ) : (
        <Spin tip="Loading">
          <div className="content" />
        </Spin>
      )}
    </div>
  );
}

export default App;
