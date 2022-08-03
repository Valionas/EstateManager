import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import { getMessagesBySender, deleteMessage } from '../../services/messages-service';
import { render } from '@testing-library/react';

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
                                        <Button type="primary" shape="round" >Update</Button>
                                    </Col>
                                    <Divider></Divider>
                                    <Col>
                                        <Button type="danger" shape="round" onClick={(e) => deleteMessageHandler(record.id)}>Delete</Button>
                                    </Col>
                                </>
                            ) : (
                                <>
                                    <Col span={12}>
                                        <Button type="primary" shape="round" >View</Button>
                                    </Col>
                                    <Divider></Divider>
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
                    <>
                        <Row justify="center">
                            <Col span={24}>
                                {
                                    messages && <Table columns={messagesColumns} dataSource={messages} />
                                }

                            </Col>
                        </Row>
                    </>
                )}
        </>
    )
}

export default SentMessages;