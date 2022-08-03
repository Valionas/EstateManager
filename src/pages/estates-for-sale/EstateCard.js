import { useSelector, useDispatch } from 'react-redux';
import { setCurrentEstate, openEstateModal, setUpdatePage } from '../../store/slices/estateSlice';


import { Col, Row, Image, Divider, Button, Carousel } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

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

    const updateRentHandler = (id) => {
        dispatch(setCurrentEstate(estateObject));
        dispatch(openEstateModal());
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
                        <p><b>Year:</b> {estateObject.year}</p>
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
                {currentUser && currentUser.id === estateObject.owner &&
                    (
                        <>
                            <Divider></Divider>
                            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
                                <Button type="primary" shape="round" onClick={updateRentHandler} style={{ marginRight: 20 }}>EDIT</Button>
                                <Button type="danger" shape="round" onClick={() => deleteEstateHandler(estateObject.id)}>DELETE</Button>
                            </Row>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default EstateCard;