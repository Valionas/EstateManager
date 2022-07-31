import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openEstateModal, closeEstateModal, setUpdatePage } from '../../store/slices/estateSlice';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin } from 'antd';


import EstateCard from './EstateCard';
import AddEditEstateModal from './modals/AddEditEstateModal';
import { getEstates } from '../../services/estates-service';

function Estates() {
    const dispatch = useDispatch();
    const updatePageTrigger = useSelector(state => state.estate.triggeredUpdate);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [estates, setEstates] = useState();

    const fetchData = async () => {
        setLoading(true);
        const data = await getEstates();
        setEstates(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [updatePageTrigger]);

    const openEstateModalHandler = () => {
        dispatch(openEstateModal());
    }

    return (
        <>
            <Row justify='center' >
                <h1>Estates</h1>
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
                                    <Button type="primary" onClick={openEstateModalHandler}>
                                        Publish for sale
                                    </Button>
                                </Row>
                            )
                        }
                        <Row justify="center">

                            {estates && estates.map((estate, index) => (
                                <Col span={12}>
                                    <EstateCard key={index} estateObject={estate}></EstateCard>
                                </Col>
                            ))}

                        </Row>
                    </>
                )}
            <AddEditEstateModal />
        </>
    )
}

export default Estates;