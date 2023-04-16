import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import { CSVLink } from 'react-csv';
import { Col, Row } from 'antd';
import { Table, Button, Spin, Image } from 'antd';

import { RiFileExcel2Line } from 'react-icons/ri';

import { getReports } from '../../services/reports-service';
import { ReduxState } from '../../store';
import { useTranslation } from 'react-i18next';

function Reports() {
  const { t } = useTranslation();
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);

  const [loading, setLoading] = useState(false);
  const [rentReports, setRentReports] = useState([]);
  const [totalRents, setTotalRents] = useState([]);
  const [estateReports, setEstateReports] = useState([]);
  const [totalEstateSales, setTotalEstateSales] = useState();

  const fetchData = async () => {
    setLoading(true);
    const data = await getReports(currentUser.email);
    const rentReports = data.filter((x) => x.type === 'rent');
    let totalRents = rentReports.reduce(function (sum, value) {
      return sum + value.rent;
    }, 0);
    const estateReports = data.filter((x) => x.type === 'estate');
    let totalEstateSales = estateReports.reduce(function (sum, value) {
      return sum + value.price;
    }, 0);

    setRentReports(rentReports);
    setTotalRents(totalRents);
    setEstateReports(estateReports);
    setTotalEstateSales(totalEstateSales);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rentColumns = [
    {
      title: t('table_image'),
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image height={'5vh'} width={'100%'} src={image} />,
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
      title: t('table_renter'),
      dataIndex: 'renter',
      key: 'renter',
    },
    {
      title: t('table_rent'),
      dataIndex: 'rent',
      key: 'rent',
    },
  ];

  const estateColumns = [
    {
      title: t('table_image'),
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image height={'5vh'} width={'100%'} src={image} />,
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
      title: t('table_sold_to'),
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: t('table_price'),
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const csvRentReportHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Rent', key: 'rent' },
    { label: 'Location', key: 'location' },
    { label: 'Renter', key: 'renter' },
  ];

  const csvEstateReportHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Price', key: 'price' },
    { label: 'Location', key: 'location' },
    { label: 'Buyer', key: 'buyer' },
  ];

  const csvRentReport = {
    data: rentReports,
    headers: csvRentReportHeaders,
    filename: 'Rent_Report.csv',
  };

  const csvEstateReport = {
    data: estateReports,
    headers: csvEstateReportHeaders,
    filename: 'Estate_Report.csv',
  };

  return (
    <>
      <Row justify="center">
        <h1>{t('reports_header')}</h1>
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
          <Row style={{ paddingBottom: '5%' }}>
            <Col md={24} lg={11}>
              <Row justify="center">
                <h2>{t('reports_rents')}</h2>
              </Row>
              <Row justify="center">
                <Button
                  icon={<RiFileExcel2Line />}
                  style={{ display: 'flex', alignItems: 'center', marginRight: 5 }}
                >
                  <CSVLink {...csvRentReport} separator={';'}>
                    {t('reports_export')}
                  </CSVLink>
                </Button>
              </Row>
              <br />
              <Table
                scroll={{ x: true }}
                columns={rentColumns}
                dataSource={rentReports}
                bordered={true}
                footer={() => (
                  <div style={{ textAlign: 'right' }}>
                    {t('reports_total')}: {totalRents}
                  </div>
                )}
              />
            </Col>
            <Col md={24} lg={{ span: 12, offset: 1 }}>
              <Row justify="center">
                <h2>{t('reports_estates')}</h2>
              </Row>
              <Row justify="center">
                <Button
                  icon={<RiFileExcel2Line />}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <CSVLink {...csvEstateReport} separator={';'}>
                    {t('reports_export')}
                  </CSVLink>
                </Button>
              </Row>
              <br />
              <Table
                scroll={{ x: true }}
                columns={estateColumns}
                dataSource={estateReports}
                bordered={true}
                footer={() => (
                  <div style={{ textAlign: 'right' }}>
                    {t('reports_total')}: {totalEstateSales}
                  </div>
                )}
              />
            </Col>
          </Row>
        </motion.div>
      )}
    </>
  );
}

export default Reports;
