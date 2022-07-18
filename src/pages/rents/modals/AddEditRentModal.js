import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal } from '../../../store/slices/rentSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Upload } from 'antd';

import { addRent } from '../../../services/rents-service';

function AddEditRentModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.rent.isOpenedRentModal);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);


    const onCancelHandler = () => {
        dispatch(closeRentModal());
        // setFields([
        // //     {
        // //         name: ['name'],
        // //         value: data.name
        // //     }
        // // ])
    }

    const onFinish = async (values) => {
        try {
            const result = await addRent(values);
            dispatch(closeRentModal());
            form.resetFields();
        } catch (err) {
            console.log(err);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const openUploadImageModal = () => {

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
                    label="Acceptable Currencies"
                    name="currencies"
                >
                    <Select >
                        <Select.Option value={'euro'}>EUR </Select.Option>
                        <Select.Option value={'bgn'}>BGN</Select.Option>
                        <Select.Option value={'usd'}>USD</Select.Option>
                        <Select.Option value={'pound'}>GBP</Select.Option>
                        <Select.Option value={'ruble'}>RUB</Select.Option>
                    </Select>
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
        </Modal>
    )
}

export default AddEditRentModal;