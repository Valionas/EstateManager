import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { firebaseMapData } from '../helpers/firebaseMapper';
import Rent from '../models/rents/Rent';

const rentsCollectionRef = collection(db, 'rents');

export const getRents = async () => {
  const data = await getDocs(rentsCollectionRef);
  const mappedArray = firebaseMapData(data);
  return mappedArray;
};

export const getRentById = async (id) => {
  const docRef = doc(db, 'rents', id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : undefined;
  if (!data) return null;

  return { id, ...data } as Rent;
};

export const addRent = async (data) => {
  await addDoc(rentsCollectionRef, data);
};

export const updateRent = async (data, id) => {
  await updateDoc(doc(db, 'rents', id), data);
};

export const deleteRent = async (id) => {
  await deleteDoc(doc(db, 'rents', id));
};
