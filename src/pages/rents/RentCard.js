import { Col, Row, Image } from 'antd';
import { Space, Table, Tag, Button } from 'antd';
import { GoLocation } from 'react-icons/go'
import './Rents.css';

function RentCard({ rentObject }) {
    return (
        <div className='rentCard'>
            <Row>
                <Col span={4} style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Image
                        height={"100%"}
                        src={rentObject.imageUrl}
                    />
                </Col>
                <Col span={13} offset={1}>
                    <h1>{rentObject.name}</h1>
                    <p><GoLocation /> {rentObject.location}</p>
                    <h1>Description</h1>
                    <p>{rentObject.description}</p>
                </Col>
                <Col span={4} offset={1}>
                    <Row>
                        <p style={{ fontSize: "3vh" }}><b>Price:</b> ${rentObject.rent}/monthly</p>
                    </Row>
                    <Row>
                        <Button type="primary" shape="round" style={{ width: "100%", marginBottom: '5%' }}>REQUEST RENT</Button>
                        <Button type="primary" shape="round" style={{ width: "100%" }}>REVIEW</Button>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default RentCard;