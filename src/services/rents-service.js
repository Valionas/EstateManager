import { db } from "../firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { firebaseMapData } from "../helpers/firebaseMapper";
const rentsCollectionRef = collection(db, 'rents');

export const getRents = async () => {
    const data = await getDocs(rentsCollectionRef);
    const mappedArray = firebaseMapData(data);
    return mappedArray;
}

export const addRent = async (data) => {
    await addDoc(rentsCollectionRef, data);
}

