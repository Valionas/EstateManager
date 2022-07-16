import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './store/slices/auth/authSlice';

import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import Rents from './pages/rents/Rents';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFoundPage from './pages/not-found/NotFoundPage';

import { publicMenuItems, authenticatedMenuItems } from './helpers/menuItems';
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.isAuthenticated);
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState();

  useEffect(() => {
    let authToken = localStorage.getItem('Auth Token');
    if (authToken) {
      dispatch(authenticate());
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      setMenuItems(authenticatedMenuItems);
    } else {
      setMenuItems(publicMenuItems);
    }
  }, [authenticated]);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
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
              {!authenticated ?
                <>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/rents" element={<Rents />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                </>
                :
                <>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/my-rents" element={<Rents />} />
                  <Route exact path="/sales" element={<Login />} />
                  <Route exact path="/reports" element={<Register />} />
                  <Route exact path="/reports" element={<Register />} />
                  <Route exact path="/publish-estate" element={<Register />} />
                  <Route exact path="/logout" element={<Register />} />
                </>
              }
              <Route exact path="*" element={<NotFoundPage />} />
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
  );
};

export default App;