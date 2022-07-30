import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeEstateModal, setCurrentEstate, setUpdatePage } from '../../../store/slices/estateSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Upload } from 'antd';

import { addEstate, updateEstate } from '../../../services/estates-service';
import { serverTimestamp } from 'firebase/firestore';

function AddEditEstateModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.estate.isOpenedEstateModal);
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentEstate = useSelector(state => state.estate.currentEstate);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();



    const onCancelHandler = () => {
        dispatch(closeEstateModal());
        form.resetFields();
    }

    const onFinish = async (values) => {
        let rentObject = values;
        rentObject.owner = currentUser.id;
        rentObject.created = serverTimestamp();

        try {
            if (currentEstate) {
                const result = await updateEstate(rentObject, currentEstate.id);
            } else {
                const result = await addEstate(values);
            }
            dispatch(setUpdatePage());
            dispatch(setCurrentEstate());
            dispatch(closeEstateModal());
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
                    label="Price"
                    name="price"
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
                    label="Image link"
                    name="image"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddEditEstateModal;