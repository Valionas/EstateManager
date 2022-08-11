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
                    name: ['startingPrice'],
                    value: currentEstate.startingPrice
                },
                {
                    name: ['bidStep'],
                    value: currentEstate.bidStep
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
                }
            ]);
        }
    }, [currentEstate]);

    const onFinish = async (values) => {
        let estateObject = values;
        estateObject.owner = currentUser.id;
        estateObject.status = "For Sale";
        estateObject.applicants = [];
        try {
            if (currentEstate) {
                const result = await updateEstate(estateObject, currentEstate.id);
            } else {
                const result = await addEstate(values);
            }
            form.resetFields();
            dispatch(setUpdatePage());
            dispatch(setCurrentEstate());
            dispatch(closeEstateModal());
        } catch (err) {
            console.log(err);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onCancelHandler = () => {
        dispatch(closeEstateModal());
        dispatch(setCurrentEstate());
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
                        {
                            min: 3,
                            message: 'Name cannot be less than 3 symbols.'
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
                            min: 3,
                            message: 'Location cannot be less than 5 symbols.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Starting Price"
                    name="startingPrice"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your starting price!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error('Use only numerical values'));
                                }

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
                    label="Bid Step"
                    name="bidStep"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your bid\'s step!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error('Use only numerical values'));
                                }

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
                    label="Year"
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your date of construction!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error('Use only numerical values'));
                                }

                                if (value < 0) {
                                    return Promise.reject(new Error('Use only positive values'));
                                }

                                if (value < 1800 || value > 2022) {
                                    return Promise.reject(new Error('Year cannot be less than 1800 and greater than current year (2022)'));
                                }

                                return Promise.resolve();
                            }
                        })
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error('Use only numerical values'));
                                }

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
                            min: 10,
                            message: 'Description cannot be shorter than 10 symbols'
                        }
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