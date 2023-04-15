import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setUpdatePage } from '../../store/slices/estateSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { approveMessage, declineMessage } from '../../globals/messages';

import {
  getEstateApplicationsByOwner,
  deleteEstateApplication,
} from '../../services/estate-applications-service';
import {
  updateMessage,
  getMessagesBySender,
  getMessageByRequestId,
} from '../../services/messages-service';
import { addReport } from '../../services/reports-service';
import { getEstateById, updateEstate } from '../../services/estates-service';
import React from 'react';
import { ReduxState } from '../../store';

function EstateApplications() {
  const dispatch = useDispatch();
  const updatePageTrigger = useSelector((state: ReduxState) => state.estate.triggeredUpdate);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);

  const [loading, setLoading] = useState(false);
  const [applications, setEstateApplications] = useState();

  const fetchData = async () => {
    setLoading(true);
    const data = await getEstateApplicationsByOwner(currentUser.email);
    setEstateApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [updatePageTrigger]);

  const approveApplicationHandler = (sender, id, application) => {
    showConfirmationModal(approveMessage, async function (answer) {
      if (answer) {
        let estate = await getEstateById(application.estateId);
        if (estate) {
          estate.applicants = [];
          estate.status = 'Sold';
          await updateEstate(estate, estate.id);

          let generatedReport = {
            image: application.image,
            name: application.estateName,
            buyer: application.buyer,
            location: application.location,
            price: Number(application.offeredPrice),
            owner: currentUser.email,
            type: 'estate',
          };

          let message = await getMessageByRequestId(sender, id);
          message.status = 'Approved';

          await addReport(generatedReport);
          await updateMessage(message, message.id);
          await deleteEstateApplication(id);
          dispatch(setUpdatePage());
        }
      }
    });
  };

  const declineApplicationHandler = (sender, id, application) => {
    showConfirmationModal(declineMessage, async function (answer) {
      if (answer) {
        let estate = await getEstateById(application.estateId);
        if (estate) {
          let estateApplicants = estate.applicants.filter((x) => x !== sender);
          estate.applicants = estateApplicants;
          await updateEstate(estate, estate.id);

          let message = await getMessageByRequestId(sender, id);
          message.status = 'Declined';
          await updateMessage(message, message.id);
          await deleteEstateApplication(id);
          dispatch(setUpdatePage());
        }
      }
    });
  };

  const applicationColumns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image height={'5vh'} width={'100%'} src={image} />,
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item, record) => (
        <>
          <Row>
            <Col span={12}>
              <Button
                type="primary"
                shape="round"
                onClick={(e) => approveApplicationHandler(record.buyer, record.id, record)}
              >
                Approve
              </Button>
            </Col>
            <Divider></Divider>
            <Col>
              <Button
                type="primary"
                shape="round"
                onClick={(e) => declineApplicationHandler(record.buyer, record.id, record)}
                danger
              >
                Decline
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Row justify="center">
        <h1>Estate Applications</h1>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" spinning={loading} />
        </Row>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: +200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
        >
          <Row justify="center">
            <Col span={24}>
              {applications && (
                <Table
                  scroll={{ x: true }}
                  columns={applicationColumns}
                  dataSource={applications}
                />
              )}
            </Col>
          </Row>
        </motion.div>
      )}
    </>
  );
}

export default EstateApplications;
