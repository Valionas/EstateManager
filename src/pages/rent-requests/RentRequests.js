import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin } from 'antd';


import RequestRentCard from './RequestRentCard';

import { getRequestsByOwner } from '../../services/rent-requests-service';

function RentRequests() {
    const dispatch = useDispatch();
    const updatePageTrigger = useSelector(state => state.rent.triggeredUpdate);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState();

    const fetchData = async () => {
        setLoading(true);
        const data = await getRequestsByOwner(currentUser.id);
        setRequests(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [updatePageTrigger]);


    return (
        <>
            <Row justify='center' >
                <h1>Rent Requests</h1>
            </Row>
            {loading ?
                (
                    <Row justify='center'>
                        <Spin size="large" spinning={loading} />
                    </Row>
                )
                :
                (
                    <>
                        <Row justify="center">
                            <Col>
                                {requests && requests.map((request, index) => (
                                    <RequestRentCard key={index} requestObject={request}></RequestRentCard>
                                ))}
                            </Col>
                        </Row>
                    </>
                )}
        </>
    )
}

export default RentRequests;