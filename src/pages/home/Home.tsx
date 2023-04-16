import { useState, useEffect } from 'react';
import { Col, Row, Button, Carousel, Image, Badge, Descriptions } from 'antd';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Home.css';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import PieChartCustomers from './components/PieChartCustomers';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
    backgroundColor: 'rgba(0, 21, 41, 0.89)',
  };

  const imageStyle = {
    height: 360,
    width: '100%',
    borderRadius: '2%',
  };

  const textStyle = {
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '1.5em',
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="homePageWrapper">
        <Row justify="center" style={{ display: 'flex', alignItems: 'center' }}>
          <Col md={24} lg={8} style={{ fontSize: 26 }} offset={1}>
            <h1 style={{ textAlign: 'center' }}>
              <b>Estate Manager</b>
            </h1>
            <p style={{ textAlign: 'center' }}>
              <b>{t('second_header')}</b>
            </p>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <Image
              style={imageStyle}
              src="https://miro.medium.com/v2/resize:fit:1400/1*2A_XDZqY9HTzKqCGAn66dg.jpeg"
            />
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <h2>{t('about_us')}</h2>
            <p style={textStyle}>{t('about_us_text')}</p>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <h2>{t('the_idea_behind')}</h2>
            <p style={textStyle}>{t('the_idea_behind_text')}</p>
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <Image
              style={imageStyle}
              src="https://imageio.forbes.com/specials-images/dam/imageserve/1176645222/0x0.jpg?format=jpg&width=1200"
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <p style={textStyle}>{t('inspired_solution_text')}</p>
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <PieChartCustomers />
          </Col>
        </Row>
        <br />
        <br />
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <Image
              style={imageStyle}
              src="https://imageio.forbes.com/specials-images/dam/imageserve/1194430802/960x0.jpg?format=jpg&width=960"
            />
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <h2>{t('our_mission')}</h2>
            <p style={textStyle}>{t('our_mission_text')}</p>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <h2>{t('why_choose')}</h2>
            <p style={textStyle}>
              {t('why_choose_text')}
              <ul>
                <li>{t('why_choose_li_1')}</li>
                <li>{t('why_choose_li_2')}</li>
                <li>{t('why_choose_li_3')}</li>
                <li>{t('why_choose_li_4')}</li>
              </ul>
            </p>
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <Image
              style={imageStyle}
              src="https://www.searchenginejournal.com/wp-content/uploads/2020/07/how-seos-the-sales-team-can-drive-business-growth-5f0c9b22e8c6d.png"
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row style={rowStyle}>
          <Col span={20} offset={2}>
            <p style={textStyle}>{t('conclusion')}</p>
          </Col>
        </Row>
        <br />
        <br />
      </div>
    </motion.div>
  );
}

export default Home;
