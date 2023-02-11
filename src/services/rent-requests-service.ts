import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { firebaseMapData } from '../helpers/firebaseMapper';
import RentRequest from '../models/rents/RentRequest';

const rentRequestsCollectionRef = collection(db, 'rentRequests');

export const getRequestsByOwner = async (owner) => {
  const data = await getDocs(rentRequestsCollectionRef);
  let mappedArray = firebaseMapData(data);
  let requestsFilteredByOwner = mappedArray.filter(
    (requestCollection) => requestCollection.owner === owner
  );
  return requestsFilteredByOwner;
};

export const getRentRequestById = async (id) => {
  const docRef = doc(db, 'rentRequests', id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : undefined;
  if (!data) return null;

  return { id, ...data } as RentRequest;
};

export const addRequest = async (data) => {
  return await addDoc(rentRequestsCollectionRef, data);
};

export const updateRequest = async (data, id) => {
  await updateDoc(doc(db, 'rentRequests', id), data);
};

export const deleteRequest = async (id) => {
  await deleteDoc(doc(db, 'rentRequests', id));
};
