import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setUpdatePage } from '../../store/slices/estateSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';

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
import { ReduxState } from '../../store';
import { useTranslation } from 'react-i18next';

function EstateApplications() {
  const { t } = useTranslation();
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
    showConfirmationModal(t('approve_message'), async function (answer) {
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
    showConfirmationModal(t('decline_message'), async function (answer) {
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
      title: t('table_image'),
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <div style={{ maxWidth: '200px', maxHeight: '160px' }}>
          <Image width={'100%'} src={image} />
        </div>
      ),
    },
    {
      title: t('table_name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('table_location'),
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: t('table_offered_price'),
      dataIndex: 'offeredPrice',
      key: 'offeredPrice',
    },
    {
      title: t('table_offered_by'),
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: t('table_date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('table_message'),
      dataIndex: 'message',
      key: 'message',
      render: (message) => (
        <div style={{ maxWidth: '200px', maxHeight: '200px', overflowY: 'auto' }}>{message}</div>
      ),
    },
    {
      title: t('table_actions'),
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
                onClick={(e) => approveApplicationHandler(record.buyer, record.id, record)}
              >
                {t('table_approve')}
              </Button>
            </Col>
            <Col md={24} lg={{ span: 11, offset: 1 }}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                shape="round"
                onClick={(e) => declineApplicationHandler(record.buyer, record.id, record)}
                danger
              >
                {t('table_decline')}
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
        <h1>{t('my_estate_offers_menu_label')}</h1>
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
                  locale={{ emptyText: t('table_no_data') }}
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
