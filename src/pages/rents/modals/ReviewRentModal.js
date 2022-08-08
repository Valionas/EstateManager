import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openReviewRentModal, closeReviewRentModal, setCurrentRent, setUpdatePage, setCurrentRentReview } from '../../../store/slices/rentSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Rate } from 'antd';

import { updateRent } from '../../../services/rents-service';

function ReviewRentModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.rent.isOpenedReviewRentModal);
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentRent = useSelector(state => state.rent.currentRent);
    const currentRentReview = useSelector(state => state.rent.currentRentReview);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();

    const [currentRate, setCurrentRate] = useState(3);
    const rates = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    useEffect(() => {
        if (currentRentReview) {
            setFields([
                {
                    name: ['monthsRented'],
                    value: currentRentReview.monthsRented
                },
                {
                    name: ['description'],
                    value: currentRentReview.description
                },
                {
                    name: ['rentState'],
                    value: currentRentReview.rentState
                },
                {
                    name: ['locationFactor'],
                    value: currentRentReview.locationFactor
                },
            ])
            setCurrentRate(currentRentReview.reviewRate);
        }
    }, [currentRentReview])

    const onCancelHandler = () => {
        form.resetFields();
        dispatch(closeReviewRentModal());
    }

    const onFinish = async (values) => {
        let rentToUpdate = { ...currentRent };
        let tempReviews = [...rentToUpdate.reviews];
        let reviewObject = values;
        reviewObject.reviewer = { id: currentUser.id, email: currentUser.email };
        reviewObject.reviewRate = currentRate;

        if (currentRentReview) {
            let currentReview = tempReviews.find(review => review.reviewer.id === currentUser.id);
            let indexOfReview = tempReviews.indexOf(currentReview);
            tempReviews.splice(indexOfReview, 1, reviewObject);
        } else {
            tempReviews.push(reviewObject);
        }
        rentToUpdate.reviews = tempReviews;

        try {
            const result = await updateRent(rentToUpdate, currentRent.id);
            dispatch(closeReviewRentModal());
            dispatch(setUpdatePage());
            dispatch(setCurrentRent());
            dispatch(setCurrentRentReview());
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error('Use only numerical values'));
                                };

                                if (value < 0) {
                                    return Promise.reject(new Error('Use only positive values'));
                                }

                                return Promise.resolve();
                            }
                        })
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
                        {
                            min: 20,
                            message: 'Description cannot be shorter than 20 symbols.'
                        }
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="State of rent"
                    name="rentState"
                    rules={[
                        {
                            required: true,
                            message: 'Please set your minimum rental time!',
                        },
                    ]}
                >
                    <Select >
                        <Select.Option value={'Poor'}>Poor </Select.Option>
                        <Select.Option value={'Neutral'}>Neutral</Select.Option>
                        <Select.Option value={'Good'}>Good</Select.Option>
                        <Select.Option value={'Very Good'}>Very Good</Select.Option>
                        <Select.Option value={'Excellent'}>Excellent</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Location factor"
                    name="locationFactor"
                    rules={[
                        {
                            required: true,
                            message: 'Please set your minimum rental time!',
                        },
                    ]}
                >
                    <Select >
                        <Select.Option value={'Desolate'}>Desolate</Select.Option>
                        <Select.Option value={'Neutral'}>Neutral</Select.Option>
                        <Select.Option value={'Lively'}>Lively</Select.Option>
                        <Select.Option value={'Very Busy'}>Very Busy</Select.Option>
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