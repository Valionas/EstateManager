import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { firebaseMapData } from '../helpers/firebaseMapper';
import EstateApplication from '../models/estates/EstateApplication';

const estateApplicationsCollectionRef = collection(db, 'estateApplications');

export const getEstateApplicationsByOwner = async (owner) => {
  const data = await getDocs(estateApplicationsCollectionRef);
  let mappedArray = firebaseMapData(data);
  let estateApplicationsFilteredByOwner = mappedArray.filter(
    (estateApplicationCollection) => estateApplicationCollection.owner === owner
  );
  return estateApplicationsFilteredByOwner;
};

export const getEstateApplicationById = async (id) => {
  const docRef = doc(db, 'estateApplications', id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : undefined;
  if (!data) return null;

  return { id, ...data } as EstateApplication;
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
