import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  closeEstateModal,
  setCurrentEstate,
  setUpdatePage,
} from '../../../store/slices/estateSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { addEstate, updateEstate } from '../../../services/estates-service';
import { serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { ReduxState } from '../../../store';
import { useTranslation } from 'react-i18next';

function AddEditEstateModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpened = useSelector((state: ReduxState) => state.estate.isOpenedEstateModal);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const currentEstate = useSelector((state: ReduxState) => state.estate.currentEstate);

  const [fields, setFields] = useState<{ name: string[]; value: any }[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentEstate) {
      setFields([
        {
          name: ['name'],
          value: currentEstate.name,
        },
        {
          name: ['location'],
          value: currentEstate.location,
        },
        {
          name: ['startingPrice'],
          value: currentEstate.startingPrice,
        },
        {
          name: ['bidStep'],
          value: currentEstate.bidStep,
        },
        {
          name: ['description'],
          value: currentEstate.description,
        },
        {
          name: ['year'],
          value: currentEstate.year,
        },
        {
          name: ['area'],
          value: currentEstate.area,
        },
        {
          name: ['images'],
          value: currentEstate.images,
        },
      ]);
    }
  }, [currentEstate]);

  const onFinish = async (values) => {
    let estateObject = values;
    estateObject.owner = currentUser.email;
    estateObject.status = 'For Sale';
    estateObject.applicants = [];
    try {
      if (currentEstate) {
        const result = await updateEstate(estateObject, currentEstate.id);
      } else {
        const result = await addEstate(values);
      }
      form.resetFields();
      dispatch(setUpdatePage());
      dispatch(setCurrentEstate(undefined));
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
    dispatch(setCurrentEstate(undefined));
    form.resetFields();
  };

  return (
    <Modal
      title={t('estate_add_info')}
      open={isOpened}
      onOk={() => form.submit()}
      onCancel={onCancelHandler}
    >
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
          label={t('estate_name')}
          name="name"
          rules={[
            {
              required: true,
              message: `${t('estate_name_required')}`,
            },
            {
              min: 3,
              message: `${t('estate_name_short')}`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('estate_location')}
          name="location"
          rules={[
            {
              required: true,
              message: `${t('estate_location_required')}`,
            },
            {
              min: 3,
              message: `${t('estate_location_short')}`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('estate_starting_price')}
          name="startingPrice"
          rules={[
            {
              required: true,
              message: `${t('estate_starting_price_required')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (isNaN(value)) {
                  return Promise.reject(new Error(`${t('estate_numerical')}`));
                }

                if (value < 0) {
                  return Promise.reject(new Error(`${t('estate_positive')}`));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('estate_bid_step')}
          name="bidStep"
          rules={[
            {
              required: true,
              message: `${t('estate_bid_step_required')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (isNaN(value)) {
                  return Promise.reject(new Error(`${t('estate_numerical')}`));
                }

                if (value < 0) {
                  return Promise.reject(new Error(`${t('estate_positive')}`));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('estate_year')}
          name="year"
          rules={[
            {
              required: true,
              message: `${t('estate_year_error')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (isNaN(value)) {
                  return Promise.reject(new Error(`${t('estate_numerical')}`));
                }

                if (value < 0) {
                  return Promise.reject(new Error(`${t('estate_positive')}`));
                }

                if (value < 1800 || value > 2023) {
                  return Promise.reject(new Error(`${t('estate_year_gap')}`));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={`${t('estate_area')} (m^2)`}
          name="area"
          rules={[
            {
              required: true,
              message: `${t('estate_area_required')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (isNaN(value)) {
                  return Promise.reject(new Error(`${t('estate_numerical')}`));
                }

                if (value < 0) {
                  return Promise.reject(new Error(`${t('estate_positive')}`));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('estate_description')}
          name="description"
          rules={[
            {
              required: true,
              message: `${t('estate_description_required')}`,
            },
            {
              min: 10,
              message: `${t('estate_description_short')}`,
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
                      return Promise.reject(new Error(`${t('estate_one_image')}`));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      style={{ marginLeft: '-57px' }}
                      label={t('estate_image_url')}
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
                            message: `${t('estate_image_url_required')}`,
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          style={{ width: '90%', marginRight: 15 }}
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
                      {t('estate_add_image')}
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
  );
}

export default AddEditEstateModal;
