import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image } from 'antd';

import { getReports } from '../../services/reports-service';

function Reports() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [rentReports, setRentReports] = useState();
    const [totalRents, setTotalRents] = useState();
    const [estateReports, setEstateReports] = useState();
    const [totalEstateSales, setTotalEstateSales] = useState();

    const rentColumns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: image => <Image
                height={"5vh"}
                width={"100%"}
                src={image}
            />
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
            title: 'Rent',
            dataIndex: 'rent',
            key: 'rent',
        }
    ];

    const estateColumns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: image => <Image
                height={"5vh"}
                width={"100%"}
                src={image}
            />
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
            title: 'Sold to',
            dataIndex: 'buyer',
            key: 'buyer',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
    ];


    const fetchData = async () => {
        setLoading(true);
        const data = await getReports(currentUser.email);
        const rentReports = data.filter(x => x.type === 'rent');
        let totalRents = rentReports.reduce(function (sum, value) {
            return sum + value.rent;
        }, 0);
        const estateReports = data.filter(x => x.type === 'estate');
        let totalEstateSales = estateReports.reduce(function (sum, value) {
            return sum + value.price;
        }, 0);

        setRentReports(rentReports);
        setTotalRents(totalRents);
        setEstateReports(estateReports);
        setTotalEstateSales(totalEstateSales);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Row justify='center' >
                <h2>Reports</h2>
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
                        <Row>
                            <Col span={11} offset={1}>
                                <Row justify='center'>
                                    <h2>Rents</h2>
                                </Row>
                                <Table columns={rentColumns} dataSource={rentReports} bordered={true} footer={() => <div style={{ textAlign: 'right' }}>Total: {totalRents}</div>} />
                            </Col>
                            <Col span={11} offset={1}>
                                <Row justify='center'>
                                    <h2>Estates</h2>
                                </Row>
                                <Table columns={estateColumns} dataSource={estateReports} bordered={true} footer={() => <div style={{ textAlign: 'right' }}>Total: {totalEstateSales}</div>} />
                            </Col>
                        </Row>
                    </motion.div>
                )}
        </>
    )
}

export default Reports;