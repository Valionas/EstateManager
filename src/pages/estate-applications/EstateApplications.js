import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import { getEstateApplicationsByOwner, deleteEstateApplication } from '../../services/estate-applications-service';
import { updateMessage, getMessagesBySender, getMessageByRequestId } from '../../services/messages-service';
import { addReport } from '../../services/reports-service';
import { getRent } from '../../services/rents-service';




function EstateApplications() {
    const dispatch = useDispatch();
    const updatePageTrigger = useSelector(state => state.estate.triggeredUpdate);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [applications, setEstateApplications] = useState();

    const fetchData = async () => {
        setLoading(true);
        const data = await getEstateApplicationsByOwner(currentUser.email);
        setEstateApplications(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [updatePageTrigger]);


    const approveApplicationHandler = (sender, id, application) => {
        showConfirmationModal(modalMessage, async function (answer) {
            if (answer) {
                let generatedReport = {
                    image: application.image,
                    name: application.estateName,
                    buyer: application.buyer,
                    location: application.location,
                    price: Number(application.offeredPrice),
                    owner: currentUser.email,
                    type: 'estate'
                }
                let message = await getMessageByRequestId(sender, id);
                message.status = 'Approved';
                await addReport(generatedReport);
                await updateMessage(message, message.id);
                await deleteEstateApplication(id);
                dispatch(setUpdatePage());
            }
        })
    }

    const declineApplicationHandler = (sender, id) => {
        showConfirmationModal(modalMessage, async function (answer) {
            if (answer) {
                let message = await getMessageByRequestId(sender, id);
                message.status = 'Declined';
                await updateMessage(message, message.id);
                await deleteEstateApplication(id);
                dispatch(setUpdatePage());
            }
        })
    }

    const applicationColumns = [
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
            title: 'Offered Price',
            dataIndex: 'offeredPrice',
            key: 'offeredPrice',
        },
        {
            title: 'Offered By',
            dataIndex: 'buyer',
            key: 'buyer',
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
                            <Button type="primary" shape="round" onClick={(e) => approveApplicationHandler(record.buyer, record.id, record)} >Approve</Button>
                        </Col>
                        <Divider></Divider>
                        <Col>
                            <Button type="danger" shape="round" onClick={(e) => declineApplicationHandler(record.buyer, record.id, record)} >Decline</Button>
                        </Col>
                    </Row>
                </>
        }
    ];

    return (
        <>
            <Row justify='center' >
                <h1>Estate Applications</h1>
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
                                    applications && <Table columns={applicationColumns} dataSource={applications} />
                                }

                            </Col>
                        </Row>
                    </motion.div>
                )}
        </>
    )
}

export default EstateApplications;