import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import { getRequestsByOwner, deleteRequest } from '../../services/rent-requests-service';
import { updateMessage, getMessagesBySender, getMessageByRequestId } from '../../services/messages-service';


function RentRequests() {
    const dispatch = useDispatch();
    const updatePageTrigger = useSelector(state => state.rent.triggeredUpdate);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState();

    const fetchData = async () => {
        setLoading(true);
        const data = await getRequestsByOwner(currentUser.email);
        setRequests(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [updatePageTrigger]);


    const approveRequestHandler = (sender, id) => {
        showConfirmationModal(modalMessage, async function (answer) {
            if (answer) {
                let message = await getMessageByRequestId(sender, id);
                message.status = 'Approved';
                await updateMessage(message, message.id);
                await deleteRequest(id);
                dispatch(setUpdatePage());
            }
        })
    }

    const declineRequestHandler = (sender, id) => {
        showConfirmationModal(modalMessage, async function (answer) {
            if (answer) {
                await deleteRequest(id);
                dispatch(setUpdatePage());
            }
        })
    }

    const requestColumns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: image => <Image
                height={"5vh"}
                width={"100%"}
                src={image}
            />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Renter',
            dataIndex: 'renter',
            key: 'renter',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (item, record) =>
                <>
                    <Row>
                        <Col span={12}>
                            <Button type="primary" shape="round" onClick={(e) => approveRequestHandler(record.renter, record.id)} >Approve</Button>
                        </Col>
                        <Divider></Divider>
                        <Col>
                            <Button type="danger" shape="round" onClick={(e) => declineRequestHandler(record.id)} >Decline</Button>
                        </Col>
                    </Row>
                </>
        }
    ];

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
                            <Col span={24}>
                                {
                                    requests && <Table columns={requestColumns} dataSource={requests} />
                                }

                            </Col>
                        </Row>
                    </>
                )}
        </>
    )
}

export default RentRequests;