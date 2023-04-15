import { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './store/slices/authSlice';

import { getAuth, signOut } from 'firebase/auth';

import { Layout, Menu, Row, Col, Dropdown, Button } from 'antd';

import { AiOutlineUserAdd, AiOutlineUserSwitch, AiOutlineHome } from 'react-icons/ai';
import { MdOutlinePayment, MdOutlineSell, MdCreate } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { GiMoneyStack, GiModernCity } from 'react-icons/gi';
import { RiMailSendLine, RiInformationLine } from 'react-icons/ri';
import { MdOutlineLock } from 'react-icons/md';
import { GlobalOutlined } from '@ant-design/icons';
import Estates from './pages/estates-for-sale/Estates';
import Rents from './pages/rents/Rents';
import RentRequests from './pages/rent-requests/RentRequests';
import EstateApplications from './pages/estate-applications/EstateApplications';
import SentMessages from './pages/sent-messages/SentMessages';
import Reports from './pages/reports/Reports';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ResetPassword from './pages/reset-password/ResetPassword';
import NotFoundPage from './pages/not-found/NotFoundPage';
import TermsAndConditions from './pages/terms-and-conditions/TermsAndConditions';

import { useTranslation } from 'react-i18next';
const { Header, Content, Footer, Sider } = Layout;
import './App.css';

const App = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const authentication = getAuth();
  const navigate = useNavigate();

  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const [language, setLanguage] = useState();
  const [menuItems, setMenuItems] = useState();

  useEffect(() => {
    let authToken = localStorage.getItem('Auth Token');
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email');
    if (authToken) {
      dispatch(authenticate({ id: userId, email: email }));
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      navigate('/rents');
    } else {
      navigate('/');
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      setMenuItems(authenticatedMenuItems);
    } else {
      setMenuItems(publicMenuItems);
    }
  }, [authenticated, i18n.language]);

  function setMenuItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    {
      key: 'bg',
      label: (
        <a target="_blank" onClick={() => i18n.changeLanguage('bg')}>
          {t('language_bulgarian')}
        </a>
      ),
    },
    {
      key: 'en',
      label: (
        <a target="_blank" onClick={() => i18n.changeLanguage('en')}>
          {t('language_english')}
        </a>
      ),
    },
  ];

  const publicMenuItems = [
    setMenuItem(<Link to="/">{t('home_menu_label')}</Link>, '1', <AiOutlineHome />),
    setMenuItem(<Link to="/login">{t('login_menu_label')}</Link>, '2', <AiOutlineUserSwitch />),
    setMenuItem(<Link to="/register">{t('register_menu_label')}</Link>, '3', <AiOutlineUserAdd />),
    setMenuItem(
      <Link to="/reset-password">{t('reset_pass_menu_label')}</Link>,
      '4',
      <MdOutlineLock />
    ),
    setMenuItem(<Link to="/rents">{t('rents_menu_label')}</Link>, '5', <MdOutlinePayment />),
    setMenuItem(
      <Link to="/estates">{t('estates_for_sale_menu_label')}</Link>,
      '6',
      <GiModernCity />
    ),
    setMenuItem(<Link to="/terms">{t('terms_menu_label')}</Link>, '7', <RiInformationLine />),
    setMenuItem(
      <Dropdown menu={{ items }}>
        <span>
          <Button shape="circle" icon={<GlobalOutlined />} /> Language
        </span>
      </Dropdown>
    ),
  ];

  const authenticatedMenuItems = [
    setMenuItem(<Link to="/">{t('home_menu_label')}</Link>, '1', <AiOutlineHome />),
    setMenuItem(<Link to="/rents">{t('rents_menu_label')}</Link>, '2', <MdOutlinePayment />),
    setMenuItem(
      <Link to="/rent-requests">{t('my_rent_requests_menu_label')}</Link>,
      '3',
      <GiMoneyStack />
    ),
    setMenuItem(
      <Link to="/estates">{t('estates_for_sale_menu_label')}</Link>,
      '4',
      <GiModernCity />
    ),
    setMenuItem(
      <Link to="/estate-offers">{t('my_estate_offers_menu_label')}</Link>,
      '5',
      <MdOutlineSell />
    ),
    setMenuItem(
      <Link to="/messages">{t('my_sent_messages_menu_label')}</Link>,
      '6',
      <RiMailSendLine />
    ),
    setMenuItem(
      <Link to="/reports">{t('reports_menu_label')}</Link>,
      '7',
      <HiOutlineDocumentReport />
    ),
    setMenuItem(<a onClick={() => logoutHandler()}>{t('logout_menu_label')}</a>, '8', <BiLogOut />),
    setMenuItem(
      <Dropdown menu={{ items }}>
        <span>
          <Button shape="circle" icon={<GlobalOutlined />} /> {t('language')}
        </span>
      </Dropdown>
    ),
  ];

  const logoutHandler = async () => {
    try {
      await signOut(authentication);
      localStorage.clear();
      dispatch(authenticate());
    } catch (err) {
      console.debug(err);
    }
  };
  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={authenticated ? ['2'] : ['1']}
        mode="horizontal"
        items={menuItems}
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Content>
        <div className="pageBackgroundWrapper">
          <div
            className="site-layout-background"
            style={{
              minHeight: 360,
            }}
          >
            <Routes>
              {!authenticated ? (
                <>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/reset-password" element={<ResetPassword />} />
                  <Route exact path="/terms" element={<TermsAndConditions />} />
                </>
              ) : (
                <>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/estate-offers" element={<EstateApplications />} />
                  <Route exact path="/rent-requests" element={<RentRequests />} />
                  <Route exact path="/messages" element={<SentMessages />} />
                  <Route exact path="/reports" element={<Reports />} />
                  <Route exact path="/logout" element={<Register />} />
                </>
              )}
              <Route exact path="/rents" element={<Rents />} />
              <Route exact path="/estates" element={<Estates />} />
              <Route exact path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Content>
      <Footer
        className="footerSection"
        style={{
          padding: 8,
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: 1,
          textAlign: 'center',
          width: '100%',
          backgroundColor: '#001529',
          color: 'white',
        }}
      >
        <Row justify="center" style={{ width: '100%' }}>
          <Col>EstateManager ©2023 Created by Valentin Kolev</Col>
        </Row>
      </Footer>

      <div id="confirmation-modal"></div>
    </>
  );
};

export default App;
