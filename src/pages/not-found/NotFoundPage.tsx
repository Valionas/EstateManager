import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button } from 'antd';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import { IoArrowBackCircleOutline } from 'react-icons/io5';

import { motion } from 'framer-motion';
import React from 'react';
import { ReduxState } from '../../store';
function NotFoundPage() {
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75 }}>
      <Row justify="center">
        <img
          src="https://seosherpa.com/wp-content/uploads/2020/12/404-error-page-header-transparent.png"
          width="800vh"
          height="500vh"
        />
      </Row>
      <Row justify="center">
        <h1 style={{ fontSize: '5vh' }}>Oops we couldn't find the page ...</h1>
      </Row>
      {currentUser ? (
        <Row justify="center">
          <Button type="primary" shape="round" style={{ width: '15%' }}>
            <Link to="/" style={{ color: 'white' }}>
              Go Back To Home
            </Link>
          </Button>
        </Row>
      ) : (
        <Row justify="center">
          <Button type="primary" shape="round" style={{ width: '15%' }}>
            <Link to="/login" style={{ color: 'white' }}>
              Go Back To Login
            </Link>
          </Button>
        </Row>
      )}
    </motion.div>
  );
}

export default NotFoundPage;
