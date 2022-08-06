import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './store/slices/authSlice';

import { getAuth, signOut } from 'firebase/auth';

import { motion } from 'framer-motion';

import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu, Row, Col } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { GrUserAdd, GrUserAdmin } from 'react-icons/gr';
import { AiOutlineUserAdd, AiOutlineUserSwitch } from 'react-icons/ai';
import { MdOutlinePayment, MdOutlineSell, MdCreate } from 'react-icons/md'
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { GiMoneyStack, GiModernCity } from 'react-icons/gi';
import { RiMailSendLine } from 'react-icons/ri';

import Estates from './pages/estates-for-sale/Estates';
import Rents from './pages/rents/Rents';
import RentRequests from './pages/rent-requests/RentRequests';
import SentMessages from './pages/sent-messages/SentMessages';
import Reports from './pages/reports/Reports';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFoundPage from './pages/not-found/NotFoundPage';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const authentication = getAuth();
  const navigate = useNavigate();

  const authenticated = useSelector(state => state.auth.currentUser);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState();

  useEffect(() => {
    let authToken = localStorage.getItem('Auth Token');
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email');
    if (authToken) {
      dispatch(authenticate({ id: userId, email: email }));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authenticated]);

  useEffect(() => {
    if (isLoggedIn) {
      setMenuItems(authenticatedMenuItems);
    } else {
      setMenuItems(publicMenuItems);
    }
  }, [isLoggedIn])

  function setMenuItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const publicMenuItems = [
    setMenuItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    setMenuItem(<Link to="/login">Login</Link>, '2', <AiOutlineUserSwitch />),
    setMenuItem(<Link to="/register">Register</Link>, '3', <AiOutlineUserAdd />),
    setMenuItem(<Link to="/rents">Rents</Link>, '4', <MdOutlinePayment />),
    setMenuItem(<Link to="/estates">Estates for sale</Link>, '5', <GiModernCity />),
  ];

  const authenticatedMenuItems = [
    setMenuItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    setMenuItem(<Link to="/rents">Rents</Link>, '2', <MdOutlinePayment />),
    setMenuItem(<Link to="/rent-requests">My Rent Requests</Link>, '3', <GiMoneyStack />),
    setMenuItem(<Link to="/estates">Estates for sale</Link>, '4', <GiModernCity />),
    setMenuItem(<Link to="/sales">My Estate Sales</Link>, '5', <MdOutlineSell />),
    setMenuItem(<Link to="/messages">My messages</Link>, '6', <RiMailSendLine />),
    setMenuItem(<Link to="/reports">Reports</Link>, '7', <HiOutlineDocumentReport />),
    setMenuItem(<a onClick={() => logoutHandler()}>Logout</a>, '8', <BiLogOut />),
  ];


  const logoutHandler = async () => {
    try {
      await signOut(authentication);
      localStorage.clear();
      dispatch(authenticate());
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.debug(err);
    }
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ zIndex: 2 }}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
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
                {!isLoggedIn ?
                  <>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                  </>
                  :
                  <>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/sales" element={<Login />} />
                    <Route exact path="/rent-requests" element={<RentRequests />} />
                    <Route exact path="/messages" element={<SentMessages />} />
                    <Route exact path="/reports" element={<Reports />} />
                    <Route exact path="/logout" element={<Register />} />
                  </>
                }
                <Route exact path="/rents" element={<Rents />} />
                <Route exact path="/estates" element={<Estates />} />
                <Route exact path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </Content>
        </motion.div>
        <Footer
          className="footerSection"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: 1,
            textAlign: 'center',
            width: "100%",
            backgroundColor: '#001529',
            color: 'white'
          }}
        >
          <Row justify='center' style={{ width: "100%" }}>
            <Col>
              EstateManager ©2022 Created by Valentin Kolev
            </Col>
          </Row>
        </Footer>
      </Layout>
      <div id="confirmation-modal"></div>
    </Layout>
  );
};

export default App;