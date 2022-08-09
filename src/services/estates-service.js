import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc, } from "firebase/firestore"
import { firebaseMapData } from "../helpers/firebaseMapper";

const estatesCollectionRef = collection(db, 'estates');

export const getEstates = async () => {
    const data = await getDocs(estatesCollectionRef);
    const mappedArray = firebaseMapData(data);
    return mappedArray;
};

export const getEstateById = async (id) => {
    const docRef = doc(db, 'estates', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.exists() ? docSnap.data() : undefined;
    if (!data) return null;

    return { id, ...data };
}

export const addEstate = async (data) => {
    await addDoc(estatesCollectionRef, data);
};

export const updateEstate = async (data, id) => {
    await updateDoc(doc(db, 'estates', id), data);
};

export const deleteEstate = async (id) => {
    await deleteDoc(doc(db, 'estates', id));
};
