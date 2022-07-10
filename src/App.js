import React, { useState } from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import Rents from './pages/rents/Rents';
import Home from './pages/home/Home';
const { Header, Content, Footer, Sider } = Layout;


function setMenuItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  setMenuItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
  setMenuItem(<Link to="/rents">Rents</Link>, '2', <DesktopOutlined />),
  setMenuItem(<Link to="/logout">Logout</Link>, '3', <DesktopOutlined />),

];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <BrowserRouter>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/rents" element={<Rents />} />
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            EstateManager ©2022 Created by Valentin Kolev
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;