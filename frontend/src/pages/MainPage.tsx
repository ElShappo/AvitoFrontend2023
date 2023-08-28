import React from 'react';
import { useState } from 'react';
import { useLoaderData, Await, useNavigate, Link } from 'react-router-dom';
import { Card, List, Typography, Button, Popover, Space, Layout, Pagination, Select } from 'antd';

import formatDate from '../utils/formatDate';
import formatSearchParams from '../utils/formatSearchParams';
import {platforms, genres, sorts} from '../constants';
import {Platform, Genre, Sort} from '../types';
import Error from '../components/Error';
import Loading from '../components/Loading';
import '../App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Meta } = Card;

function MainPage() {
  const data: any = useLoaderData();
  console.log(data);
  const navigate = useNavigate();

  let [page, setPage] = useState(1); // page No currently shown
  let [pageSize, setPageSize] = useState(10); // number of games on a single page

  let [platform, setPlatform] = useState<Platform>(data.platform); // current platform
  let [genre, setGenre] = useState<Genre>(data.genres); // current genres
  let [sort, setSort] = useState<Sort>(data.sort); // current sort

  function onPlatformChange(value: Platform) {
    console.log(value);
    setPlatform(value);
    navigate(`/?platform=${value}&genres=${genre}&sort=${sort}`);
    setPage(1);
    setPageSize(10);
  };

  function onGenresChange(value: Genre) {
    console.log(value);
    setGenre(value);
    navigate(`/?platform=${platform}&genres=${value}&sort=${sort}`);
    setPage(1);
    setPageSize(10);
  };

  function onSortChange(value: Sort) {
    console.log(value);
    setSort(value);
    navigate(`/?platform=${platform}&genres=${genre}&sort=${value}`);
    setPage(1);
    setPageSize(10);
  };

  return (
      <React.Suspense fallback={<Loading />}>
        <Await
          resolve={data.games}
          errorElement={<Error />}
        >
          {(games) => (
            <Layout className="App">
              <Header className="mainHeader">
                <Title className="mainTitle">Games</Title>
              </Header>

              <Content>
                <Space direction='vertical' size={10} wrap>
                  <div>
                    <Space wrap>
                      <Select
                        showSearch
                        onChange={onPlatformChange}
                        options={formatSearchParams(platforms)}
                        value={platform || 'any platform'}
                        defaultValue='any platform'
                        style={{ width: "9em" }}
                      />
                      <Select
                        showSearch
                        onChange={onGenresChange}
                        options={formatSearchParams(genres)}
                        value={genre || 'any genre'}
                        defaultValue='any genre'
                        style={{ width: "9em" }}
                      />
                      <Select
                        showSearch
                        onChange={onSortChange}
                        options={formatSearchParams(sorts)}
                        value={sort || 'relevance'}
                        defaultValue='relevance'
                        style={{ width: "9em" }}
                      />
                    </Space>
                  </div>

                  <List
                    grid={{
                      gutter: 16,
                      xs: 1,
                      sm: 2,
                      md: 2,
                      lg: 2,
                      xl: 4,
                      xxl: 5,
                    }}
                    dataSource={games.slice((page - 1) * pageSize, page * pageSize)}
                    renderItem={(item: any) => (
                      <Link to={`/game/${item.id}`}>
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
                      </Link>
                    )}
                  ></List>
                </Space>
              </Content>

              <Footer className="mainFooter">
                <Pagination current={page} pageSize={pageSize} total={games.length} onChange={(page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }} />
              </Footer>
            </Layout>
          )}
        </Await>
      </React.Suspense>
  )
}

export default MainPage;