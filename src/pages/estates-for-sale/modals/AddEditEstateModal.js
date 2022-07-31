import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeEstateModal, setCurrentEstate, setUpdatePage } from '../../../store/slices/estateSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { addEstate, updateEstate } from '../../../services/estates-service';
import { serverTimestamp } from 'firebase/firestore';

function AddEditEstateModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.estate.isOpenedEstateModal);
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentEstate = useSelector(state => state.estate.currentEstate);

    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (currentEstate) {
            debugger
            setFields([
                {
                    name: ['name'],
                    value: currentEstate.name
                },
                {
                    name: ['location'],
                    value: currentEstate.location
                },
                {
                    name: ['price'],
                    value: currentEstate.price
                },
                {
                    name: ['description'],
                    value: currentEstate.description
                },
                {
                    name: ['year'],
                    value: currentEstate.year
                },
                {
                    name: ['area'],
                    value: currentEstate.area
                },
                {
                    name: ['images'],
                    value: currentEstate.images
                },
            ])
        }
    }, [currentEstate]);

    const onFinish = async (values) => {
        let estateObject = values;
        estateObject.owner = currentUser.id;
        estateObject.created = serverTimestamp();
        debugger;
        try {
            if (currentEstate) {
                const result = await updateEstate(estateObject, currentEstate.id);
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

    const onCancelHandler = () => {
        dispatch(closeEstateModal());
        form.resetFields();
    }

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
                            message: 'Please input your price!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Year"
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your date of construction!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Area (m^2)"
                    name="area"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your estate\'s area!',
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
                <Row>
                    <Col offset={3} span={21}>
                        <Form.List
                            name="images"
                            rules={[
                                {
                                    validator: async (_, images) => {
                                        if (!images || images.length < 1) {
                                            return Promise.reject(new Error('At least 1 image'));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            style={{ marginLeft: "-57px" }}
                                            label='Image Url'
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input image's url.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input
                                                    style={{ width: "90%", marginRight: 15 }}
                                                    placeholder="https://image.url"
                                                />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{
                                                marginLeft: 150,
                                                width: '60%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add image
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default AddEditEstateModal;