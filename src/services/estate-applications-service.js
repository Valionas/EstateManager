import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc, } from "firebase/firestore"
import { firebaseMapData } from "../helpers/firebaseMapper";

const estateApplicationsCollectionRef = collection(db, 'estateApplications');

export const getEstateApplicationsByOwner = async (owner) => {
    const data = await getDocs(estateApplicationsCollectionRef);
    let mappedArray = firebaseMapData(data);
    let estateApplicationsFilteredByOwner = mappedArray.filter(estateApplicationCollection => estateApplicationCollection.owner === owner);
    return estateApplicationsFilteredByOwner;
};

export const addEstateApplication = async (data) => {
    return await addDoc(estateApplicationsCollectionRef, data);
};

export const updateEstateApplication = async (data, id) => {
    await updateDoc(doc(db, 'estateApplications', id), data);
};

export const deleteEstateApplication = async (id) => {
    await deleteDoc(doc(db, 'estateApplications', id));
};
