import { useSelector, useDispatch } from 'react-redux';
import { openRequestRentModal, closeRequestRentModal } from '../../store/slices/rentSlice';

import { Col, Row, Image } from 'antd';
import { Space, Table, Tag, Button } from 'antd';
import { GoLocation } from 'react-icons/go'
import './Rents.css';


import RequestRentModal from './modals/RequestRentModal';

function RentCard({ rentObject }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);

    const openRentModalHandler = () => {
        dispatch(openRequestRentModal());
    }

    return (
        <>
            <div className='rentCard'>
                <Row>
                    <Col span={4} style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Image
                            height={"100%"}
                            src={rentObject.image}
                        />
                    </Col>
                    <Col span={13} offset={1}>
                        <h1>{rentObject.name}</h1>
                        <p><GoLocation /> {rentObject.location}</p>
                        <h1>Description</h1>
                        <p>{rentObject.description}</p>
                    </Col>
                    <Col span={4} offset={1}>
                        <Row>
                            <p style={{ fontSize: "2vh" }}><b>Price:</b> ${rentObject.rent}/monthly</p>
                        </Row>
                        <Row>
                            <p style={{ fontSize: "2vh" }}><b>Minimal rental time:</b> ${rentObject.minimalRentalTime}</p>
                        </Row>
                        <Row>
                            <p style={{ fontSize: "2vh" }}><b>Acceptable currencies:</b> ${rentObject.currencies}</p>
                        </Row>
                        {currentUser && currentUser.id !== rentObject.owner &&
                            <Row>
                                <Button type="primary" shape="round" style={{ width: "100%", marginBottom: '5%' }} onClick={openRentModalHandler}>REQUEST RENT</Button>
                                <Button type="primary" shape="round" style={{ width: "100%" }}>REVIEW</Button>
                            </Row>
                        }
                    </Col>
                </Row>
            </div>
            <RequestRentModal />
        </>
    )
}

export default RentCard;