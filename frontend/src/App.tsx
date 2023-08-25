import React from 'react';
import { useState, useEffect } from 'react';
import { Card, List } from 'antd';

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

  let [gamesList, setGamesList] = useState([]);

  return (
    <div className="App">
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
        />
    </div>
  );
}

export default App;
