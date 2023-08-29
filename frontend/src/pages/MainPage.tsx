import React from 'react';
import { useState } from 'react';
import { useLoaderData, Await, useNavigate, Link } from 'react-router-dom';
import { Card, List, Typography, Button, Popover, Space, Layout, Pagination, Select } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

import formatDate from '../utils/formatDate';
import formatSearchParams from '../utils/formatSearchParams';
import {platforms, genres, sorts} from '../constants';
import {Platform, Genre, Sort, PageSize} from '../types';
import Error from '../components/Error';
import Loading from '../components/Loading';
import './MainPage.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Meta } = Card;

function MainPage() {
  const data: any = useLoaderData();
  const navigate = useNavigate();
  console.log(data);

  let [page, setPage] = useState(Number(data.page)); // page No currently shown
  let [pageSize, setPageSize] = useState(Number(data.pageSize)); // number of games on a single page

  console.warn(page, pageSize);

  let [platform, setPlatform] = useState<Platform>(data.platform); // current platform
  let [genre, setGenre] = useState<Genre>(data.genre); // current genre
  let [sort, setSort] = useState<Sort>(data.sort); // current sort

  function onPlatformChange(value: Platform) {
    console.log(value);
    setPlatform(value);
    navigate(`/?platform=${value}&genre=${genre}&sort=${sort}`);
    // setPage(1);
    // setPageSize(10);
  };

  function onGenresChange(value: Genre) {
    console.log(value);
    setGenre(value);
    navigate(`/?platform=${platform}&genre=${value}&sort=${sort}`);
    // setPage(1);
    // setPageSize(10);
  };

  function onSortChange(value: Sort) {
    console.log(value);
    setSort(value);
    navigate(`/?platform=${platform}&genre=${genre}&sort=${value}`);
    // setPage(1);
    // setPageSize(10);
  };

  function onPaginationChange(newPage: number, newPageSize: number) {
    console.warn(newPage, newPageSize);
    setPage(newPage);
    setPageSize(newPageSize);
    navigate(`/?platform=${platform}&genre=${genre}&sort=${sort}&page=${newPage}&pageSize=${newPageSize}`);
  }

  return (
      <React.Suspense fallback={<Loading />}>
        <Await
          resolve={data.games}
          errorElement={<Error>Couldn't fetch games <FrownOutlined /></Error>}
        >
          {(games) => (
            <Layout className="App">
              <Header className="mainHeader">
                <Title className="mainTitle">Games</Title>
              </Header>

              <Content>
                  <div>
                    <Space wrap>
                      <Select
                        showSearch
                        onChange={onPlatformChange}
                        options={formatSearchParams(platforms)}
                        value={platform}
                        style={{ width: "9em" }}
                      />
                      <Select
                        showSearch
                        onChange={onGenresChange}
                        options={formatSearchParams(genres)}
                        value={genre}
                        style={{ width: "9em" }}
                      />
                      <Select
                        showSearch
                        onChange={onSortChange}
                        options={formatSearchParams(sorts)}
                        value={sort}
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
                    style={{ marginTop: "1em" }}
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
              </Content>

              <Footer className="mainFooter">
                <Pagination current={page} pageSize={pageSize} total={games.length} pageSizeOptions={[20, 40, 60, 80, 100]} 
                  onChange={(newPage, newPageSize) => onPaginationChange(newPage, newPageSize)} />
              </Footer>
            </Layout>
          )}
        </Await>
      </React.Suspense>
  )
}

export default MainPage;