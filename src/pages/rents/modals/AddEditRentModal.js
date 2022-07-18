import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal } from '../../../store/slices/rentSlice';


import { Space, Table, Tag, Modal, Button } from 'antd';


function AddEditRentModal() {
    const dispatch = useDispatch();
    const isOpened = useSelector(state => state.rent.isOpenedRentModal);

    const onSubmitHandler = () => {
        dispatch(closeRentModal());
    }

    const onCancelHandler = () => {
        dispatch(closeRentModal());
    }

    return (
        <Modal title="Basic Modal" visible={isOpened} onOk={onSubmitHandler} onCancel={onCancelHandler}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default AddEditRentModal;