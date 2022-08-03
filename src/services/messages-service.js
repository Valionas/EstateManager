import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc, } from "firebase/firestore"
import { firebaseMapData } from "../helpers/firebaseMapper";

const messagesCollectionRef = collection(db, 'messages');

export const getMessagesBySender = async (sender) => {
    const data = await getDocs(messagesCollectionRef);
    let mappedArray = firebaseMapData(data);
    debugger
    let requestsFilteredBySender = mappedArray.find(requestCollection => requestCollection.sender === sender);
    if (requestsFilteredBySender) {
        return requestsFilteredBySender.messages;
    }

    return [];
};

export const addMessage = async (data) => {
    await addDoc(messagesCollectionRef, data);
};

export const updateMessage = async (data, id) => {
    await updateDoc(doc(db, 'messages', id), data);
};

export const deleteMessage = async (id) => {
    await deleteDoc(doc(db, 'messages', id));
};
