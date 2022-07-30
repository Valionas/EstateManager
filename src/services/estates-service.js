import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc, } from "firebase/firestore"
import { firebaseMapData } from "../helpers/firebaseMapper";

const estatesCollectionRef = collection(db, 'estates');

export const getEstates = async () => {
    const data = await getDocs(estatesCollectionRef);
    const mappedArray = firebaseMapData(data);
    return mappedArray;
};

export const addEstate = async (data) => {
    await addDoc(estatesCollectionRef, data);
};

export const updateEstate = async (data, id) => {
    await updateDoc(doc(db, 'estates', id), data);
};

export const deleteEstate = async (id) => {
    await deleteDoc(doc(db, 'estates', id));
};
