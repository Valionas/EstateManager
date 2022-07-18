import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal } from '../../store/slices/rentSlice';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button } from 'antd';


import RentCard from './RentCard';
import AddEditRentModal from './modals/AddEditRentModal';

import { getRents } from '../../services/rents-service';

function Rents() {
    const dispatch = useDispatch();
    const [rents, setRents] = useState();

    const fetchData = async () => {
        const data = await getRents();
        setRents(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const openRentModalHandler = () => {
        dispatch(openRentModal());
    }

    return (
        <>
            <Row justify='center'>
                <h1>Rents</h1>
            </Row>
            <Row justify='center'>
                <Button type="primary" onClick={openRentModalHandler}>
                    Add Rentable Estate
                </Button>
            </Row>
            <Row justify="center">
                <Col>
                    {rents && rents.map((rent) => (
                        <RentCard rentObject={rent}></RentCard>
                    ))}
                </Col>
            </Row>
            <AddEditRentModal />
        </>
    )
}

export default Rents;