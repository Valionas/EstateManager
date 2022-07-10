import { Col, Row, Image } from 'antd';
import { Space, Table, Tag } from 'antd';

function RentCard({ rentObject }) {
    return (
        <>
            <Row>
                <Col span={3}>
                    <Image
                        src={rentObject.imageUrl}
                    />
                </Col>
                <Col span={12} offset={1}>
                    <h1>{rentObject.name}</h1>
                    <p>{rentObject.description}</p>
                </Col>
                <Col span={6} offset={2}>
                    <Row>
                        <p style={{ fontSize: 26 }}>$ {rentObject.rent}/monthly</p>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Image
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col span={16} offset={2}>
                            <p>{rentObject.owner}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default RentCard;