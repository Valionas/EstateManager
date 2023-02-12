import { useState, useEffect } from 'react';
import { Col, Row, Button, Carousel, Image, Badge, Descriptions } from 'antd';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Home.css';
import React from 'react';

const contentStyle: React.CSSProperties = {
  height: '260px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="homePageWrapper">
        <Row justify="center" style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={8} style={{ fontSize: 32 }} offset={1}>
            <h1>
              <b>Estate Manager</b>
            </h1>
            <p>
              <b>Helping people with their estate needs</b>
            </p>
            <Row>
              <Col span={10}>
                <Button type="primary" shape="round" className="navigationButton">
                  <Link to="/estates" style={{ color: 'white' }}>
                    RENTS
                  </Link>
                </Button>
              </Col>
              <Col span={10} offset={1}>
                <Button type="primary" shape="round" className="navigationButton">
                  <Link to="/rents" style={{ color: 'white' }}>
                    ESTATES
                  </Link>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={10} offset={2}>
            <Carousel autoplay>
              <div>
                <Image
                  height={360}
                  width={'100%'}
                  src="https://s3-eu-west-1.amazonaws.com/askremax/1096/8baaf1e5-d9ee-a7e6-a42d-5b78c7cc8142.jpg"
                />
              </div>
              <div>
                <Image
                  height={360}
                  width={'100%'}
                  src="https://com.ohio.gov/wps/wcm/connect/gov/0c115c02-9baa-4cea-a5d4-300d4c086156/GettyImages-1207038160.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_M1HGGIK0N0JO00QO9DDDDM3000-0c115c02-9baa-4cea-a5d4-300d4c086156-nT57rqt"
                />
              </div>
              <div>
                <Image
                  height={360}
                  width={'100%'}
                  src="https://www.homee.com/hubfs/How%20to%20Meet%20Property%20Management%20Regulations-2-1.jpeg"
                />
              </div>
              <div>
                <Image
                  height={360}
                  width={'100%'}
                  src="https://sourcedfranchise.co/wp-content/uploads/2021/11/shutterstock_520166548.png"
                />
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
}

export default Home;
