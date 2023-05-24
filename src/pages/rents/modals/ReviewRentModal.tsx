import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  closeReviewRentModal,
  setCurrentRent,
  setUpdatePage,
  setCurrentRentReview,
} from '../../../store/slices/rentSlice';

import { Row, Modal, Form, Input, Select, Rate } from 'antd';

import { updateRent } from '../../../services/rents-service';

import { ReduxState } from '../../../store';

import { useTranslation } from 'react-i18next';

function ReviewRentModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpened = useSelector((state: ReduxState) => state.rent.isOpenedReviewRentModal);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const currentRent = useSelector((state: ReduxState) => state.rent.currentRent);
  const currentRentReview = useSelector((state: ReduxState) => state.rent.currentRentReview);

  const [fields, setFields] = useState<{ name: string[]; value: any }[]>([]);
  const [form] = Form.useForm();

  const [currentRate, setCurrentRate] = useState(3);
  const rates = [
    t('rent_review_star_1'),
    t('rent_review_star_2'),
    t('rent_review_star_3'),
    t('rent_review_star_4'),
    t('rent_review_star_5'),
  ];

  useEffect(() => {
    if (currentRentReview) {
      setFields([
        {
          name: ['monthsRented'],
          value: currentRentReview.monthsRented,
        },
        {
          name: ['description'],
          value: currentRentReview.description,
        },
        {
          name: ['rentState'],
          value: currentRentReview.rentState,
        },
        {
          name: ['locationFactor'],
          value: currentRentReview.locationFactor,
        },
      ]);
      setCurrentRate(currentRentReview.reviewRate);
    }
  }, [currentRentReview]);

  const onCancelHandler = () => {
    form.resetFields();
    dispatch(setCurrentRent(null));
    dispatch(setCurrentRentReview(undefined));
    dispatch(closeReviewRentModal());
  };

  const onFinish = async (values) => {
    let rentToUpdate = { ...currentRent! };
    let tempReviews = [...rentToUpdate.reviews];
    let reviewObject = values;
    reviewObject.reviewer = { id: currentUser.id, email: currentUser.email };
    reviewObject.reviewRate = currentRate;

    if (currentRentReview) {
      let currentReview = tempReviews.find((review) => review.reviewer.id === currentUser.id);
      let indexOfReview = tempReviews.indexOf(currentReview!);
      tempReviews.splice(indexOfReview, 1, reviewObject);
    } else {
      tempReviews.push(reviewObject);
    }
    rentToUpdate.reviews = tempReviews;

    try {
      const result = await updateRent(rentToUpdate, currentRent!.id);
      dispatch(closeReviewRentModal());
      dispatch(setUpdatePage());
      dispatch(setCurrentRent(null));
      dispatch(setCurrentRentReview(null));
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
      title={t('rent_modal_header')}
      open={isOpened}
      onOk={() => form.submit()}
      onCancel={onCancelHandler}
      okText={t('rent_modal_ok_btn')}
      cancelText={t('rent_modal_cancel_btn')}
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
          label={t('rent_months_label')}
          name="monthsRented"
          rules={[
            {
              required: true,
              message: `${t('rent_review_months_required')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (isNaN(value)) {
                  return Promise.reject(new Error(`${t('rent_review_numerical')}`));
                }

                if (value < 0) {
                  return Promise.reject(new Error(`${t('rent_review_positive')}`));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('rent_description_label')}
          name="description"
          rules={[
            {
              required: true,
              message: `${t('rent_description_required')}`,
            },
            {
              min: 10,
              message: `${t('rent_description_short')}`,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={t('rent_state_label')}
          name="rentState"
          rules={[
            {
              required: true,
              message: `${t('rent_review_state_required')}`,
            },
          ]}
        >
          <Select>
            <Select.Option value={'Poor'}>{t('rent_state_poor')}</Select.Option>
            <Select.Option value={'Neutral'}>{t('rent_state_neutral')}</Select.Option>
            <Select.Option value={'Good'}>{t('rent_state_good')}</Select.Option>
            <Select.Option value={'Very Good'}>{t('rent_state_very_good')}</Select.Option>
            <Select.Option value={'Excellent'}>{t('rent_state_excellent')}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('rent_location_label')}
          name="locationFactor"
          rules={[
            {
              required: true,
              message: `${t('rent_review_location_factor')}`,
            },
          ]}
        >
          <Select>
            <Select.Option value={'Desolate'}>{t('rent_location_desolate')}</Select.Option>
            <Select.Option value={'Neutral'}>{t('rent_location_neutral')}</Select.Option>
            <Select.Option value={'Lively'}>{t('rent_location_lively')}</Select.Option>
            <Select.Option value={'Very Busy'}>{t('rent_location_very_busy')}</Select.Option>
          </Select>
        </Form.Item>
        <Row justify="center">
          <span style={{ marginLeft: 35 }}>
            <Rate tooltips={rates} onChange={setCurrentRate} value={currentRate} />
            {currentRate ? <span className="ant-rate-text">{rates[currentRate - 1]}</span> : ''}
          </span>
        </Row>
      </Form>
    </Modal>
  );
}

export default ReviewRentModal;
