import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeRentModal, setCurrentRent, setUpdatePage } from '../../../store/slices/rentSlice';

import { Modal, Form, Input, Select, Upload } from 'antd';

import { addRent, updateRent } from '../../../services/rents-service';

import { ReduxState } from '../../../store';
import { useTranslation } from 'react-i18next';
function AddEditRentModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpened = useSelector((state: ReduxState) => state.rent.isOpenedRentModal);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const currentRent = useSelector((state: ReduxState) => state.rent.currentRent);

  const [fields, setFields] = useState<{ name: string[]; value: any }[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentRent) {
      setFields([
        {
          name: ['name'],
          value: currentRent.name,
        },
        {
          name: ['location'],
          value: currentRent.location,
        },
        {
          name: ['rent'],
          value: currentRent.rent,
        },
        {
          name: ['description'],
          value: currentRent.description,
        },
        {
          name: ['minimalRentalTime'],
          value: currentRent.minimalRentalTime,
        },
        {
          name: ['image'],
          value: currentRent.image,
        },
      ]);
    }
  }, [currentRent]);

  const onCancelHandler = () => {
    dispatch(closeRentModal());
    dispatch(setCurrentRent(null));
    form.resetFields();
  };

  const onFinish = async (values) => {
    let rentObject = values;
    rentObject.applicants = [];
    rentObject.owner = currentUser.email;
    if (currentRent) {
      rentObject.reviews = currentRent.reviews;
    } else {
      rentObject.status = 'Rentable';
      rentObject.reviews = [];
    }

    try {
      if (currentRent) {
        const result = await updateRent(rentObject, currentRent.id);
      } else {
        const result = await addRent(values);
      }
      dispatch(setUpdatePage());
      dispatch(setCurrentRent(null));
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
    <Modal
      title={t('rent_modal_add_header')}
      open={isOpened}
      okText={t('rent_modal_ok_btn')}
      cancelText={t('rent_modal_cancel_btn')}
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
          label={t('rent_estate_name')}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your estate's name!",
            },
            {
              min: 3,
              message: 'Name cannot be shorter than 3 symbols',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('rent_location')}
          name="location"
          rules={[
            {
              required: true,
              message: "Please input your estate's location!",
            },
            {
              min: 5,
              message: 'Location cannot be shorter than 5 symbols',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (isNaN(value)) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Check your location once again.'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('rent_per_month')}
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

                if (value < 0) {
                  return Promise.reject(new Error('Use only positive values'));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('rent_description')}
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your description!',
            },
            {
              min: 20,
              message: 'Description cannot be shorter than 20 symbols.',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={t('rent_minimal_rent_time')}
          name="minimalRentalTime"
          rules={[
            {
              required: true,
              message: 'Please set your minimum rental time!',
            },
          ]}
        >
          <Select>
            <Select.Option value={3}>3 {t('months')}</Select.Option>
            <Select.Option value={6}>6 {t('months')}</Select.Option>
            <Select.Option value={9}>9 {t('months')}</Select.Option>
            <Select.Option value={12}>12 {t('months')}</Select.Option>
            <Select.Option value={24}>24 {t('months')}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('rent_minimal_rent_time')}
          name="image"
          rules={[
            {
              required: true,
              message: 'Please set your image link!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value.includes('https://')) {
                  return Promise.reject(
                    new Error('Use a valid image link, starting with https://')
                  );
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddEditRentModal;
