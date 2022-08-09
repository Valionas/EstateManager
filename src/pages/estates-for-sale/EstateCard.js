import { useSelector, useDispatch } from 'react-redux';
import { setCurrentEstate, openEstateModal, setUpdatePage, openApplyForEstateModal } from '../../store/slices/estateSlice';


import { Col, Row, Image, Divider, Button, Carousel } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import ApplyForEstateModal from './modals/ApplyForEstateModal';

import { GoLocation } from 'react-icons/go'
import './Estates.css';

import { deleteEstate } from '../../services/estates-service';

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

    const deleteEstateHandler = async (id) => {
        showConfirmationModal(modalMessage, async function (answer) {
            if (answer) {
                await deleteEstate(id);
                dispatch(setUpdatePage());
            }
        })
    }

    const updateEstateHandler = (id) => {
        dispatch(setCurrentEstate(estateObject));
        dispatch(openEstateModal());
    }

    const openEstateApplicationModalHandler = () => {
        dispatch(setCurrentEstate(estateObject));
        dispatch(openApplyForEstateModal());
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
                <Divider></Divider>
                <Row justify='center' style={{ marginTop: 20 }}>
                    <Col span={10} offset={3}>
                        <p><b>Starting Price:</b> {estateObject.startingPrice} BGN</p>
                    </Col>
                    <Col span={10} offset={1}>
                        <p><b>Year:</b> {estateObject.year}</p>
                    </Col>

                </Row>
                <Row justify='center' style={{ marginTop: 20 }}>
                    <Col span={10} offset={3}>
                        <p><b>Bid Step:</b> {estateObject.bidStep} BGN</p>
                    </Col>
                    <Col span={10} offset={1}>
                        <p><b>Area:</b> {estateObject.area} m^2</p>
                    </Col>
                </Row>
                <Row justify='center' style={{ marginTop: 20 }}>
                    <Col span={10} offset={3}>
                        <p><b>Location:</b> {estateObject.location}</p>
                    </Col>
                </Row>
                <Row justify='center' style={{ marginTop: 20 }}>
                    <Col span={10} offset={4}>
                        <p><b>Status:</b> <span className={estateObject.status === 'For Sale' ? 'saleEstateBanner' : 'soldEstateBanner'} >{estateObject.status}</span></p>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row justify='center'>
                    <Col>
                        <p style={{ textAlign: 'justify', height: "25vh", overflow: 'auto' }}><b>DESCRIPTION:</b> {estateObject.description}</p>
                    </Col>
                </Row>
                {currentUser && currentUser.email === estateObject.owner &&
                    (
                        <>
                            <Divider></Divider>
                            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
                                <Button type="primary" shape="round" onClick={updateEstateHandler} style={{ marginRight: 20 }}>EDIT</Button>
                                <Button type="danger" shape="round" onClick={() => deleteEstateHandler(estateObject.id)}>DELETE</Button>
                            </Row>
                        </>
                    )
                }
                {currentUser && currentUser.email !== estateObject.owner &&
                    <Row justify='center'>
                        {estateObject.applicants.find(applicant => applicant === currentUser.email) === undefined && (
                            <Button type="primary" shape="round" style={{ width: "80%", marginBottom: '5%' }} onClick={openEstateApplicationModalHandler}>Apply to buy</Button>
                        )}
                    </Row>
                }
            </div>
            <ApplyForEstateModal />
        </>
    )
}

export default EstateCard;