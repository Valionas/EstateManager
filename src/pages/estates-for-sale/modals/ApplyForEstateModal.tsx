import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  closeApplyForEstateModal,
  setCurrentEstate,
  setUpdatePage,
  setCurrentEstateApplication,
} from '../../../store/slices/estateSlice';

import { Modal, Form, Input } from 'antd';

import {
  addEstateApplication,
  getEstateApplicationById,
  updateEstateApplication,
} from '../../../services/estate-applications-service';
import { addMessage, updateMessage } from '../../../services/messages-service';
import { updateEstate } from '../../../services/estates-service';
import { ReduxState } from '../../../store';
import Message from '../../../models/messages/Message';
import EstateApplication from '../../../models/estates/EstateApplication';
import { format } from 'date-fns';

function ApplyForEstateModal() {
  const dispatch = useDispatch();
  const isOpened = useSelector((state: ReduxState) => state.estate.isOpenedApplyForEstateModal);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const currentEstate = useSelector((state: ReduxState) => state.estate.currentEstate);
  const currentEstateApplication = useSelector(
    (state: ReduxState) => state.estate.currentEstateApplication
  );

  const [fields, setFields] = useState<{ name: string[]; value: any }[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentEstateApplication) {
      setFields([
        {
          name: ['message'],
          value: currentEstateApplication.message,
        },
        {
          name: ['offerPrice'],
          value: currentEstateApplication.price,
        },
      ]);
    }
  }, [currentEstateApplication]);

  const onCancelHandler = () => {
    form.resetFields();
    dispatch(setCurrentEstate(undefined));
    dispatch(setCurrentEstateApplication(undefined));
    dispatch(closeApplyForEstateModal());
  };

  const onFinish = async (values) => {
    if (!currentEstateApplication && currentEstate) {
      //Generate request for estate owner
      let applicationObject: EstateApplication = {
        estateId: currentEstate.id,
        image: currentEstate.images[0],
        estateName: currentEstate.name,
        location: currentEstate.location,
        buyer: currentUser.email!,
        offeredPrice: Number(values.offerPrice),
        message: values.message,
        date: format(new Date(), 'dd-mm-yyyy HH:mm'),
        owner: currentEstate.owner,
      };

      //Generate message for buyer
      let messageObject: Message = {
        relatedObjectId: currentEstate.id,
        image: currentEstate.images[0],
        name: currentEstate.name,
        location: currentEstate.location,
        receiver: currentEstate.owner,
        sender: currentUser.email!,
        price: values.offerPrice,
        message: values.message,
        type: 'estate',
        date: format(new Date(), 'dd-mm-yyyy HH:mm'),
        status: 'Pending',
      };

      let updatedEstate = { ...currentEstate };
      let copyArr = [...updatedEstate.applicants];
      copyArr.push(currentUser.email!);
      updatedEstate.applicants = copyArr;

      try {
        const result = await addEstateApplication(applicationObject);
        messageObject.relatedOfferId = result.id;
        await addMessage(messageObject);
        await updateEstate(updatedEstate, updatedEstate.id);
        dispatch(setUpdatePage());
        dispatch(setCurrentEstate({}));
        dispatch(closeApplyForEstateModal());
        form.resetFields();
      } catch (err) {
        console.log(err);
      }
    } else {
      let currentMessage = { ...currentEstateApplication };
      currentMessage.price = values.offerPrice;
      currentMessage.message = values.message;
      try {
        await updateMessage(currentMessage, currentMessage.id);
        let estateApplicationToUpdate = await getEstateApplicationById(
          currentMessage.relatedOfferId
        );
        if (estateApplicationToUpdate) {
          estateApplicationToUpdate.message = values.message;
          estateApplicationToUpdate.offeredPrice = values.offerPrice;
          await updateEstateApplication(estateApplicationToUpdate, estateApplicationToUpdate.id);
          dispatch(setUpdatePage());
          dispatch(setCurrentEstate({}));
          dispatch(closeApplyForEstateModal());
          form.resetFields();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Fill your application..."
      visible={isOpened}
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
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: 'Please input your motivational message!',
            },
            {
              min: 10,
              message: 'Message cannot be shorter than 10 symbols',
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
      </Form>
    </Modal>
  );
}

export default ApplyForEstateModal;
