import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin } from 'antd';


import RentCard from './RentCard';
import AddEditRentModal from './modals/AddEditRentModal';

import { getRents } from '../../services/rents-service';

function Rents() {
    const dispatch = useDispatch();
    const updatePageTrigger = useSelector(state => state.rent.triggeredUpdate);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [rents, setRents] = useState();

    const fetchData = async () => {
        setLoading(true);
        const data = await getRents();
        setRents(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [updatePageTrigger]);

    const openRentModalHandler = () => {
        dispatch(openRentModal());
    }

    return (
        <>
            <Row justify='center' >
                <h1>Rents</h1>
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
                        {
                            currentUser && (
                                <Row justify='center' style={{ marginBottom: '10px' }}>
                                    <Button type="primary" onClick={openRentModalHandler}>
                                        Add Rentable Estate
                                    </Button>
                                </Row>
                            )
                        }
                        <Row justify="center">
                            <Col>
                                {rents && rents.map((rent, index) => (
                                    <RentCard key={index} rentObject={rent}></RentCard>
                                ))}
                            </Col>
                        </Row>
                    </>
                )}
            <AddEditRentModal />
        </>
    )
}

export default Rents;