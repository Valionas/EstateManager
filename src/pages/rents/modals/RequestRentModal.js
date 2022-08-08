import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeRequestRentModal, setCurrentRent, setUpdatePage } from '../../../store/slices/rentSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Upload } from 'antd';

import { addRequest } from '../../../services/rent-requests-service';
import { addMessage } from '../../../services/messages-service';
import { updateRent } from '../../../services/rents-service';



function RequestRentModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.rent.isOpenedRequestRentModal);
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentRent = useSelector(state => state.rent.currentRent);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();

    const onCancelHandler = () => {
        dispatch(closeRequestRentModal());
    }

    const onFinish = async (values) => {
        //Generate request for rent owner
        let requestObject = {
            rentId: currentRent.id,
            image: currentRent.image,
            name: currentRent.name,
            location: currentRent.location,
            renter: currentUser.email,
            rent: currentRent.rent,
            message: values.message,
            owner: currentRent.owner,
        };


        //Generate message for renter
        let messageObject = {
            relatedObjectId: currentRent.id,
            image: currentRent.image,
            name: currentRent.name,
            location: currentRent.location,
            receiver: currentRent.owner,
            sender: currentUser.email,
            rent: currentRent.rent,
            type: 'rent',
            message: values.message,
            status: 'Pending',
        };

        let updatedRent = { ...currentRent };
        let copyArr = [...updatedRent.applicants];
        copyArr.push(currentUser.email);
        updatedRent.applicants = copyArr;

        try {
            const result = await addRequest(requestObject);
            messageObject.relatedOfferId = result.id;
            await addMessage(messageObject);
            await updateRent(updatedRent, updatedRent.id);
            dispatch(setUpdatePage());
            dispatch(setCurrentRent());
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
                    label="Message"
                    name="message"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your motivational message!',
                        },
                        {
                            min: 10,
                            message: 'Message cannot be shorter than 10 symbols'
                        }
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RequestRentModal;