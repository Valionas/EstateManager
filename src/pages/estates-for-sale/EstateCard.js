import { useSelector, useDispatch } from 'react-redux';
import { openRequestRentModal, openReviewRentModal, openRentModal, setCurrentRent, setUpdatePage } from '../../store/slices/rentSlice';

import { Col, Row, Image, Divider, Button, Carousel } from 'antd';


import { GoLocation } from 'react-icons/go'
import './Estates.css';

import { deleteRent } from '../../services/rents-service';

const contentStyle = {
    height: '100px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

function EstateCard({ estateObject }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);

    const openRequestRentModalHandler = () => {
        dispatch(setCurrentRent(estateObject));
        dispatch(openRequestRentModal());
    }

    const openReviewRentModalHandler = () => {
        dispatch(setCurrentRent(estateObject));
        dispatch(openReviewRentModal());
    }

    const deleteRentHandler = async (id) => {
        await deleteRent(id);
        dispatch(setUpdatePage());
    }

    const updateRentHandler = (id) => {
        dispatch(setCurrentRent(estateObject));
        dispatch(openRentModal());
    }

    return (
        <>
            <div className='estateCard'>
                <Row>
                    <Col span={24}>
                        <Carousel effect="fade" className='carouselCard'>
                            {estateObject?.images.map((image) =>
                            (
                                <div style={contentStyle}>
                                    <Image
                                        height={"35vh"}
                                        width={"100%"}
                                        src={image}
                                    />
                                </div>
                            )
                            )}
                        </Carousel>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <h1><b>{estateObject.name}</b></h1>
                    </Col>
                </Row>
                <Row justify='center' style={{ marginTop: 20 }}>
                    <Col span={7} offset={1}>
                        <p><b>PRICE:</b> {estateObject.price}</p>
                    </Col>
                    <Col span={7}>
                        <p><b>Year:</b> {estateObject.dateOfConstruction}</p>
                    </Col>
                    <Col span={7}>
                        <p><b>Area:</b> {estateObject.area}m^2</p>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row justify='center'>
                    <Col>
                        <p style={{ textAlign: 'justify', height: "25vh", overflow: 'auto' }}><b>DESCRIPTION:</b> {estateObject.description}</p>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default EstateCard;