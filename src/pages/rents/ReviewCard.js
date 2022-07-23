import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openReviewRentModal } from '../../store/slices/rentSlice';

import { updateRent } from '../../services/rents-service';

import { Col, Row, Divider, Rate, Button } from 'antd';
import { RiUserVoiceLine } from 'react-icons/ri';
import { MdOutlineRealEstateAgent, MdOutlineEditLocationAlt, MdOutlineEditCalendar, MdOutlineStarRate } from 'react-icons/md';

function ReviewCard({ reviewObject }) {
    const dispatch = useDispatch();
    const rates = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    const deleteReviewHandler = async (id) => {
        await updateRent(id);
    }

    const updateReviewHandler = (id) => {
        dispatch(openReviewRentModal());
    };

    return (
        <>
            <Divider orientation='left' style={{ fontSize: 20 }}><RiUserVoiceLine /> : {reviewObject.reviewer.email}</Divider>
            <div className='reviewCard'>
                <Row>
                    <Col span={6} style={{ fontSize: 20 }} offset={2}>
                        <p>
                            <MdOutlineEditCalendar />: {reviewObject.monthsRented} months
                        </p>
                        <p>
                            <MdOutlineRealEstateAgent />: {reviewObject.rentState}
                        </p>
                        <p>
                            <MdOutlineEditLocationAlt />: {reviewObject.locationFactor}
                        </p>
                        <p>
                            <MdOutlineStarRate />: <Rate tooltips={rates} disabled value={reviewObject.reviewRate} />
                        </p>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: "100%" }} />
                    </Col>
                    <Col span={10}>
                        <div style={{ width: "100%" }}>
                            <b>DESCRIPTION:</b>
                            <span> {reviewObject.description}</span>
                        </div>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: "100%" }} />
                    </Col>
                    <Col span={3} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <Row style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <Button type="primary" shape="round" style={{ width: "100%", marginBottom: '5%' }} onClick={updateReviewHandler}>UPDATE REVIEW</Button>
                            <Button type="danger" shape="round" style={{ width: "100%" }} onClick={() => deleteReviewHandler(reviewObject.id)}>DELETE REVIEW</Button>
                        </Row>
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
            </div >
        </>
    )
}

export default ReviewCard;