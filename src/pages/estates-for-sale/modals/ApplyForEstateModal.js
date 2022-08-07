import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeApplyForEstateModal, setCurrentEstate, setUpdatePage } from '../../../store/slices/estateSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Upload } from 'antd';

import { addEstateApplication } from '../../../services/estate-applications-service';
import { addMessage } from '../../../services/messages-service';
import { updateEstate } from '../../../services/estates-service';



function ApplyForEstateModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.estate.isOpenedApplyForEstateModal);
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentEstate = useSelector(state => state.estate.currentEstate);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();

    const onCancelHandler = () => {
        form.resetFields();
        setCurrentEstate();
        dispatch(closeApplyForEstateModal());
    }

    const onFinish = async (values) => {
        //Generate request for estate owner
        let applicationObject = {
            estateId: currentEstate.id,
            image: currentEstate.images[0],
            name: currentEstate.name,
            location: currentEstate.location,
            buyer: currentUser.email,
            offeredPrice: values.offerPrice,
            message: values.message,
            owner: currentEstate.owner,
        };


        //Generate message for buyer
        let messageObject = {
            relatedObjectId: currentEstate.id,
            image: currentEstate.images[0],
            name: currentEstate.name,
            location: currentEstate.location,
            receiver: currentEstate.owner,
            sender: currentUser.email,
            price: values.offerPrice,
            message: values.message,
            status: 'Pending',
        };

        let updatedEstate = { ...currentEstate };
        let copyArr = [...updatedEstate.applicants];
        copyArr.push(currentUser.email);
        updatedEstate.applicants = copyArr;

        try {
            const result = await addEstateApplication(applicationObject);
            messageObject.applicationId = result.id;
            await addMessage(messageObject);
            await updateEstate(updatedEstate, updatedEstate.id);
            dispatch(setUpdatePage());
            dispatch(setCurrentEstate());
            dispatch(closeApplyForEstateModal());
            form.resetFields();
        } catch (err) {
            console.log(err);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal title="Fill your application..." visible={isOpened} onOk={() => form.submit()} onCancel={onCancelHandler}>
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
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Offer Price"
                    name="offerPrice"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your offer!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ApplyForEstateModal;