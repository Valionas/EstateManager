import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentRentRequest, openRentModal, closeRentModal, setUpdatePage, openRequestRentModal } from '../../store/slices/rentSlice';
import { setCurrentEstateApplication, openApplyForEstateModal } from '../../store/slices/estateSlice';


import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import { getMessagesBySender, deleteMessage } from '../../services/messages-service';
import { render } from '@testing-library/react';

import RequestRentModal from '../rents/modals/RequestRentModal';
import ApplyForEstateModal from '../estates-for-sale/modals/ApplyForEstateModal';

function SentMessages() {
    const dispatch = useDispatch();
    const updatePageTrigger = useSelector(state => state.rent.triggeredUpdate);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState();

    const fetchData = async () => {
        setLoading(true);
        const data = await getMessagesBySender(currentUser.email);
        setMessages(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [updatePageTrigger]);

    const deleteMessageHandler = (id) => {
        showConfirmationModal(modalMessage, async function (answer) {
            if (answer) {
                await deleteMessage(id);
                dispatch(setUpdatePage());
            }
        })
    };

    const updateMessageHandler = (record) => {
        switch (record.type) {
            case "estate":
                dispatch(setCurrentEstateApplication(record));
                dispatch(openApplyForEstateModal());
                break;
            case "rent":
                dispatch(setCurrentRentRequest(record));
                dispatch(openRequestRentModal());
                break;
            default:
                break;
        }
    }

    const messagesColumns = [
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
            title: 'Receiver',
            dataIndex: 'receiver',
            key: 'receiver',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (item, record) =>
                <>
                    <Row>
                        {
                            record.status === 'Pending' ? (
                                <>
                                    <Col span={12}>
                                        <Button type="primary" shape="round" onClick={(e) => updateMessageHandler(record)}>Update</Button>
                                    </Col>
                                    <Divider></Divider>
                                    <Col>
                                        <Button type="danger" shape="round" onClick={(e) => deleteMessageHandler(record.id)}>Delete</Button>
                                    </Col>
                                </>
                            ) : (
                                <>
                                    <Col>
                                        <Button type="danger" shape="round" onClick={(e) => deleteMessageHandler(record.id)}>Delete</Button>
                                    </Col>
                                </>
                            )

                        }
                    </Row>
                </>
        }
    ];

    return (
        <>
            <Row justify='center' >
                <h1>Sent Messages</h1>
            </Row>
            {loading ?
                (
                    <Row justify='center'>
                        <Spin size="large" spinning={loading} />
                    </Row>
                )
                :
                (
                    <motion.div
                        initial={{ opacity: 0, x: +200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.75 }}
                    >
                        <Row justify="center">
                            <Col span={24}>
                                {
                                    messages && <Table columns={messagesColumns} dataSource={messages} />
                                }

                            </Col>
                        </Row>
                    </motion.div>
                )}
            <RequestRentModal />
            <ApplyForEstateModal />
        </>
    )
}

export default SentMessages;