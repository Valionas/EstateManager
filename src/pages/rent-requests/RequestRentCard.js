import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openReviewRentModal, setCurrentRent, setCurrentRentReview, setUpdatePage } from '../../store/slices/rentSlice';

import { updateRent } from '../../services/rents-service';

import { Col, Row, Divider, Rate, Button } from 'antd';
import { RiUserVoiceLine } from 'react-icons/ri';
import { MdOutlineRealEstateAgent, MdOutlineEditLocationAlt, MdOutlineEditCalendar, MdOutlineStarRate } from 'react-icons/md';

function RequestRentCard({ rentRequest }) {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.auth.currentUser);

    return (
        <>
            <Divider orientation='left' style={{ fontSize: 20 }}><RiUserVoiceLine /> : {rentRequest.requester}</Divider>
            <div className='reviewCard'>
                <Row>
                    <Col span={6} style={{ fontSize: 20 }} offset={2}>
                        <p>
                            <RiUserVoiceLine />: TEST
                        </p>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: "100%" }} />
                    </Col>
                    <Col span={10}>
                        <div style={{ width: "100%" }}>
                            <b>DESCRIPTION:</b>
                            <span> {rentRequest.description}</span>
                        </div>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: "100%" }} />
                    </Col>
                    <Col span={3} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <Row style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <Button type="primary" shape="round" style={{ width: "100%", marginBottom: '5%' }} >Approve Request</Button>
                            <Button type="danger" shape="round" style={{ width: "100%" }} >Decline Request</Button>
                        </Row>
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
            </div >
        </>
    )
}

export default RequestRentCard;