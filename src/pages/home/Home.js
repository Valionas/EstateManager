import { Col, Row } from 'antd';
import './Home.css';

function Home() {


    return (
        <div className="homePageWrapper">
            <Row justify='center'>
                <Col span={6} style={{ fontSize: 32 }} offset={2}>
                    <h1><b>Estate Manager</b></h1>
                    <p><b>Helping people with their estate needs</b></p>
                </Col>
                <Col span={10} offset={3}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quidem impedit iste similique molestiae dolor repellendus distinctio sequi, illum laborum, vitae provident, facere illo temporibus veritatis sit fugit nisi. Non.</p>
                </Col>
            </Row>
        </div>
    )
}

export default Home