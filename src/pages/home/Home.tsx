import { useState, useEffect } from 'react';
import { Col, Row, Button, Carousel, Image, Badge, Descriptions } from 'antd';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Home.css';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';

function Home() {
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
    backgroundColor: 'rgba(0, 21, 41, 0.89)',
    margin: '0 1% 0 1%',
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
          <Col md={24} lg={8} style={{ fontSize: 32 }} offset={1}>
            <h1 style={{ textAlign: 'center' }}>
              <img
                style={{ width: 50, height: 50 }}
                src="https://icon-library.com/images/estate-icon/estate-icon-23.jpg"
              />
              <b>
                {' '}
                Estate{' '}
                <img
                  style={{ width: 50, height: 50 }}
                  src="https://icon-library.com/images/estate-icon/estate-icon-23.jpg"
                />{' '}
                Manager
              </b>
            </h1>
            <p style={{ textAlign: 'center' }}>
              <b>Helping people with their estate needs</b>
            </p>
          </Col>
        </Row>
        <br />
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <Image
              style={imageStyle}
              src="https://miro.medium.com/v2/resize:fit:1400/1*2A_XDZqY9HTzKqCGAn66dg.jpeg"
            />
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <h2>About Us</h2>
            <p style={textStyle}>
              We are a team of tech-savvy individuals who understand the importance of efficient
              estate management in today's fast-paced world. Our goal is to revolutionize the way
              people manage their properties, making it easier, more organized, and less stressful.
            </p>
          </Col>
        </Row>
        <br />
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <h2>The Idea Behind Our Estate Management Application</h2>
            <p style={textStyle}>
              We noticed a common problem among property owners - managing their estates was a
              tedious, time-consuming task that took away from other important aspects of their
              lives. From keeping track of tenants and their payments to maintaining the property,
              estate management can be overwhelming. And with traditional methods such as paper
              records and manual management, it was easy for important information to be lost or
              overlooked.
            </p>
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <Image
              style={imageStyle}
              src="https://imageio.forbes.com/specials-images/dam/imageserve/1176645222/0x0.jpg?format=jpg&width=1200"
            />
          </Col>
        </Row>
        <br />
        <Row style={rowStyle}>
          <Col span={20} offset={2}>
            <p style={textStyle}>
              This inspired us to create a solution that would simplify estate management for the
              average user. Our estate management application is designed to make your life easier
              by providing you with a centralized platform to manage all aspects of your property.
              With real-time updates, 24/7 access, and secure data storage, our app makes it easy
              for you to keep track of everything from anywhere, at any time.
            </p>
          </Col>
        </Row>
        <br />
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <Image
              style={imageStyle}
              src="https://imageio.forbes.com/specials-images/dam/imageserve/1194430802/960x0.jpg?format=jpg&width=960"
            />
          </Col>
          <Col md={24} lg={{ span: 8, offset: 1 }}>
            <h2>Our Mission</h2>
            <p style={textStyle}>
              Our mission is to provide property owners with an efficient and user-friendly solution
              to manage their estates. We believe that everyone should have access to tools that
              make their lives easier, and we are dedicated to delivering just that. Our team is
              constantly working to improve our app and add new features that will make estate
              management a breeze.
            </p>
          </Col>
        </Row>
        <br />
        <Row style={rowStyle}>
          <Col md={24} lg={{ span: 11, offset: 2 }}>
            <h2>Why Choose Our Estate Management Application</h2>
            <p style={textStyle}>
              Our estate management application is designed with the user in mind. We understand the
              importance of having a system that is easy to use, accessible, and secure. Our app
              offers:
              <ul>
                <li>
                  Seamless estate management: Our app streamlines all aspects of estate management,
                  from property maintenance to tenant relations.
                </li>
                <li>
                  Real-time updates: Our app provides real-time updates, so you can stay on top of
                  everything that's happening with your property.
                </li>
                <li>
                  24/7 access: With 24/7 access, you can manage your estate from anywhere, at any
                  time.
                </li>
                <li>
                  Secure data storage: We understand the importance of keeping your information
                  safe, which is why we use state-of-the-art security measures to ensure that your
                  data is always protected.
                </li>
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
        <Row style={rowStyle}>
          <Col span={20} offset={2}>
            <p style={textStyle}>
              In conclusion, our estate management application was created to make your life easier.
              With its user-friendly interface, real-time updates, and 24/7 access, managing your
              estate has never been easier. Try it today and see the difference for yourself!
            </p>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
}

export default Home;
