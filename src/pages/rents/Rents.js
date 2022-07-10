import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { Space, Table, Tag } from 'antd';
import RentCard from './RentCard';
import { getRents } from '../../services/rents-service';

function Rents() {
    const [rents, setRents] = useState();

    const fetchData = async () => {
        const data = await getRents();
        setRents(data);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <Row justify='center'>
                <h1>Rents</h1>
            </Row>
            <Row justify="center">
                <Col>
                    {rents && rents.map((rent) => (
                        <RentCard rentObject={rent}></RentCard>
                    ))}
                </Col>
            </Row>
        </>
    )
}

export default Rents