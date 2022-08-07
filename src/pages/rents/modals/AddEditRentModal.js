import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeRentModal, setCurrentRent, setUpdatePage } from '../../../store/slices/rentSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Upload } from 'antd';

import { addRent, updateRent } from '../../../services/rents-service';
import { serverTimestamp } from 'firebase/firestore';

function AddEditRentModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.rent.isOpenedRentModal);
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentRent = useSelector(state => state.rent.currentRent);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (currentRent) {
            setFields([
                {
                    name: ['name'],
                    value: currentRent.name
                },
                {
                    name: ['location'],
                    value: currentRent.location
                },
                {
                    name: ['rent'],
                    value: currentRent.rent
                },
                {
                    name: ['description'],
                    value: currentRent.description
                },
                {
                    name: ['minimalRentalTime'],
                    value: currentRent.minimalRentalTime
                },
                {
                    name: ['image'],
                    value: currentRent.image
                },
            ])
        }
    }, [currentRent]);

    const onCancelHandler = () => {
        dispatch(closeRentModal());
        form.resetFields();
    }

    const onFinish = async (values) => {
        let rentObject = values;
        rentObject.owner = currentUser.email;
        if (currentRent) {
            rentObject.reviews = currentRent.reviews
        } else {
            rentObject.reviews = [];
        }

        try {
            if (currentRent) {
                const result = await updateRent(rentObject, currentRent.id);
            } else {
                const result = await addRent(values);
            }
            dispatch(setUpdatePage());
            dispatch(setCurrentRent());
            dispatch(closeRentModal());
            form.resetFields();
        } catch (err) {
            console.log(err);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal title="Add the following information..." visible={isOpened} onOk={() => form.submit()} onCancel={onCancelHandler}>
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
                    label="Estate name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your estate\'s name!',
                        },
                        {
                            min: 3,
                            message: 'Name cannot be shorter than 3 symbols'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your estate\'s location!',
                        },
                        {
                            min: 5,
                            message: 'Location cannot be shorter than 5 symbols'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Check your location once again.'));
                            }
                        })
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Rent / month"
                    name="rent"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your rent!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error('Use only numerical values'));
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
                    label="Minimum rental time"
                    name="minimalRentalTime"
                    rules={[
                        {
                            required: true,
                            message: 'Please set your minimum rental time!',
                        },
                    ]}
                >
                    <Select >
                        <Select.Option value={3}>3 months</Select.Option>
                        <Select.Option value={6}>6 months</Select.Option>
                        <Select.Option value={9}>9 months</Select.Option>
                        <Select.Option value={12}>12 months</Select.Option>
                        <Select.Option value={24}>24 months</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Image link"
                    name="image"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default AddEditRentModal;