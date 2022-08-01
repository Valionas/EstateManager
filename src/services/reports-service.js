import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc, } from "firebase/firestore"
import { firebaseMapData } from "../helpers/firebaseMapper";

const reportsCollectionRef = collection(db, 'reports');

export const getReports = async () => {
    const data = await getDocs(reportsCollectionRef);
    const mappedArray = firebaseMapData(data);
    return mappedArray;
};

export const addReport = async (data) => {
    await addDoc(reportsCollectionRef, data);
};

export const updateReport = async (data, id) => {
    await updateDoc(doc(db, 'reports', id), data);
};

export const deleteReport = async (id) => {
    await deleteDoc(doc(db, 'reports', id));
};
