import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openReviewRentModal, closeReviewRentModal, setCurrentRent, setUpdatePage } from '../../../store/slices/rentSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Rate } from 'antd';

import { updateRent } from '../../../services/rents-service';

function ReviewRentModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.rent.isOpenedReviewRentModal);
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentRent = useSelector(state => state.rent.currentRent);


    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();

    const [currentRate, setCurrentRate] = useState(3);
    const rates = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


    const onCancelHandler = () => {
        dispatch(closeReviewRentModal());
    }

    const onFinish = async (values) => {
        let rentToUpdate = { ...currentRent };
        let tempReviews = [...rentToUpdate.reviews];
        let reviewObject = values;
        reviewObject.reviewer = { id: currentUser.id, email: currentUser.email };
        reviewObject.reviewRate = currentRate;
        tempReviews.push(reviewObject);
        rentToUpdate.reviews = tempReviews;
        try {
            const result = await updateRent(rentToUpdate, currentRent.id);
            dispatch(closeReviewRentModal());
            dispatch(setUpdatePage());
            dispatch(setCurrentRent({}));
            form.resetFields();
        } catch (err) {
            console.log(err);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal title="Drop your review..." visible={isOpened} onOk={() => form.submit()} onCancel={onCancelHandler}>
            <Form
                form={form}
                fields={fields}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Months rented"
                    name="monthsRented"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your rent time!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your description!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="State of rent"
                    name="rentState"
                >
                    <Select >
                        <Select.Option value={'poor'}>Poor </Select.Option>
                        <Select.Option value={'neutral'}>Neutral</Select.Option>
                        <Select.Option value={'good'}>Good</Select.Option>
                        <Select.Option value={'veryGood'}>Very Good</Select.Option>
                        <Select.Option value={'excellent'}>Excellent</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Location factor"
                    name="locationFactor"
                >
                    <Select >
                        <Select.Option value={'poor'}>Desolate</Select.Option>
                        <Select.Option value={'neutral'}>Neutral</Select.Option>
                        <Select.Option value={'good'}>Lively</Select.Option>
                        <Select.Option value={'veryGood'}>Very Busy</Select.Option>
                    </Select>
                </Form.Item>
                <Row justify='center'>
                    <span style={{ marginLeft: 35 }}>
                        <Rate tooltips={rates} onChange={setCurrentRate} value={currentRate} />
                        {currentRate ? <span className="ant-rate-text">{rates[currentRate - 1]}</span> : ''}
                    </span>
                </Row>
            </Form>
        </Modal>
    )
}

export default ReviewRentModal;