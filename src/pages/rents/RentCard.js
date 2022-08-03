import { useSelector, useDispatch } from 'react-redux';
import { openRequestRentModal, openReviewRentModal, openRentModal, setCurrentRent, setUpdatePage } from '../../store/slices/rentSlice';

import { Col, Row, Image, Divider } from 'antd';
import { Space, Table, Tag, Button } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import { GoLocation } from 'react-icons/go'
import './Rents.css';


import RequestRentModal from './modals/RequestRentModal';
import ReviewRentModal from './modals/ReviewRentModal';
import AddEditRentModal from './modals/AddEditRentModal';
import ReviewCard from './ReviewCard';

import { deleteRent } from '../../services/rents-service';

function RentCard({ rentObject }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);

    const openRequestRentModalHandler = () => {
        dispatch(setCurrentRent(rentObject));
        dispatch(openRequestRentModal());
    }

    const openReviewRentModalHandler = () => {
        dispatch(setCurrentRent(rentObject));
        dispatch(openReviewRentModal());
    }

    const deleteRentHandler = async (id) => {
        showConfirmationModal(modalMessage, async function (answer) {
            if (answer) {
                await deleteRent(id);
                dispatch(setUpdatePage());
            }
        })
    }

    const updateRentHandler = (id) => {
        dispatch(setCurrentRent(rentObject));
        dispatch(openRentModal());
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
                                <Button type="primary" shape="round" style={{ width: "100%", marginBottom: '5%' }} onClick={openRequestRentModalHandler}>REQUEST RENT</Button>
                                {rentObject.reviews.find(review => review.reviewer.id === currentUser.id) === undefined && (
                                    <Button type="primary" shape="round" style={{ width: "100%" }} onClick={openReviewRentModalHandler}>REVIEW</Button>
                                )}
                            </Row>
                        }
                        {currentUser && currentUser.id === rentObject.owner &&
                            <Row>
                                <Button type="primary" shape="round" style={{ width: "100%", marginBottom: '5%' }} onClick={updateRentHandler}>UPDATE RENT</Button>
                                <Button type="danger" shape="round" style={{ width: "100%" }} onClick={() => deleteRentHandler(rentObject.id)}>DELETE RENT</Button>
                            </Row>
                        }
                    </Col>
                </Row>
                <Divider />
                <Row justify='center'>
                    <h1><b>REVIEWS</b></h1>
                </Row>
                <Row>
                    {rentObject.reviews && rentObject.reviews.map(review => (
                        <ReviewCard reviewObject={review} rentObject={rentObject}></ReviewCard>
                    ))}
                </Row>
            </div>
            <RequestRentModal />
            <ReviewRentModal />
        </>
    )
}

export default RentCard;