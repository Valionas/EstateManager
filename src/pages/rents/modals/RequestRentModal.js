import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRequestRentModal, closeRequestRentModal } from '../../../store/slices/rentSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Upload } from 'antd';

import { addRent } from '../../../services/rents-service';

function RequestRentModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.rent.isOpenedRequestRentModal);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);


    const onCancelHandler = () => {
        dispatch(closeRequestRentModal());
    }

    const onFinish = async (values) => {
        let rentObject = values;
        rentObject.owner = currentUser.id;
        try {
            const result = await addRent(values);
            dispatch(closeRequestRentModal());
            form.resetFields();
        } catch (err) {
            console.log(err);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal title="Fill your request..." visible={isOpened} onOk={() => form.submit()} onCancel={onCancelHandler}>
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
            </Form>
        </Modal>
    )
}

export default RequestRentModal;