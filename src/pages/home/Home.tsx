import { useState, useEffect } from 'react';
import { Col, Row, Button } from 'antd';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Home.css';
import React from 'react';

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="homePageWrapper">
        <Row justify="center">
          <Col span={6} style={{ fontSize: 32 }} offset={1}>
            <h1>
              <b>Estate Manager</b>
            </h1>
            <p>
              <b>Helping people with their estate needs</b>
            </p>
          </Col>
          <Col span={10} offset={3}>
            <Row justify="center" className="navigationButtonRow">
              <Button type="primary" shape="round" className="navigationButton">
                <Link to="/estates" style={{ color: 'white' }}>
                  RENTS
                </Link>
              </Button>
            </Row>
            <Row justify="center" className="navigationButtonRow">
              <Button type="primary" shape="round" className="navigationButton">
                <Link to="/rents" style={{ color: 'white' }}>
                  ESTATES
                </Link>
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
}

export default Home;
