import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { declineMessage, approveMessage } from '../../globals/messages';

import { getRequestsByOwner, deleteRequest } from '../../services/rent-requests-service';
import {
  updateMessage,
  getMessagesBySender,
  getMessageByRequestId,
} from '../../services/messages-service';
import { addReport } from '../../services/reports-service';
import { getRentById, updateRent } from '../../services/rents-service';
import React from 'react';
import { ReduxState } from '../../store';

function RentRequests() {
  const dispatch = useDispatch();
  const updatePageTrigger = useSelector((state: ReduxState) => state.rent.triggeredUpdate);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);

  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState();

  const fetchData = async () => {
    setLoading(true);
    const data = await getRequestsByOwner(currentUser.email);
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [updatePageTrigger]);

  const approveRequestHandler = (sender, id, request) => {
    showConfirmationModal(approveMessage, async function (answer) {
      if (answer) {
        let rent = await getRentById(request.rentId);
        if (rent) {
          rent.applicants = [];
          rent.status = 'Occupied';
          await updateRent(rent, rent.id);

          let generatedReport = {
            image: request.image,
            name: request.rentName,
            renter: request.renter,
            location: request.location,
            rent: Number(request.rent),
            owner: currentUser.email,
            type: 'rent',
          };
          let message = await getMessageByRequestId(sender, id);
          message.status = 'Approved';
          await addReport(generatedReport);
          await updateMessage(message, message.id);
          await deleteRequest(id);
          dispatch(setUpdatePage());
        }
      }
    });
  };

  const declineRequestHandler = (sender, id, request) => {
    showConfirmationModal(declineMessage, async function (answer) {
      if (answer) {
        let rent = await getRentById(request.rentId);
        if (rent) {
          let rentApplicants = rent.applicants.filter((x) => x !== sender);
          rent.applicants = rentApplicants;
          await updateRent(rent, rent.id);

          let message = await getMessageByRequestId(sender, id);
          message.status = 'Declined';
          await updateMessage(message, message.id);
          await deleteRequest(id);
          dispatch(setUpdatePage());
        }
      }
    });
  };

  const requestColumns = [
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
      title: 'Rent',
      dataIndex: 'rent',
      key: 'rent',
    },
    {
      title: 'Renter',
      dataIndex: 'renter',
      key: 'renter',
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
            <Col md={24} lg={{ span: 11 }} style={{ marginBottom: 5 }}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                shape="round"
                onClick={(e) => approveRequestHandler(record.renter, record.id, record)}
              >
                Approve
              </Button>
            </Col>
            <Col md={24} lg={{ span: 11, offset: 1 }}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                shape="round"
                onClick={(e) => declineRequestHandler(record.renter, record.id, record)}
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
        <h1>Rent Requests</h1>
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
              {requests && (
                <Table
                  scroll={{ x: true }}
                  columns={requestColumns}
                  dataSource={requests}
                  style={{ verticalAlign: 'inherit', marginBottom: 15 }}
                />
              )}
            </Col>
          </Row>
        </motion.div>
      )}
    </>
  );
}

export default RentRequests;
