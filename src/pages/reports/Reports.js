import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image } from 'antd';

import { getReports } from '../../services/reports-service';

function Reports() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);

    const [loading, setLoading] = useState(false);
    const [rentReports, setRentReports] = useState();
    const [estateReports, setEstateRepors] = useState();

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
        const data = await getReports();
        const rentReports = data.filter(x => x.type === 'rent');
        const estateReports = data.filter(x => x.type === 'estate');
        setRentReports(rentReports);
        setEstateRepors(estateReports);
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
                    <Row>
                        <Col span={11} offset={1}>
                            <Row justify='center'>
                                <h2>Rents</h2>
                            </Row>
                            <Table columns={rentColumns} dataSource={rentReports} />
                        </Col>
                        <Col span={11} offset={1}>
                            <Row justify='center'>
                                <h2>Estates</h2>
                            </Row>
                            <Table columns={estateColumns} dataSource={estateReports} />
                        </Col>
                    </Row>
                )}
        </>
    )
}

export default Reports;