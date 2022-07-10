import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { firebaseMapData } from "../helpers/firebaseMapper";
const rentsCollectionRef = collection(db, 'rents');

export const getRents = async () => {
    const data = await getDocs(rentsCollectionRef);
    const mappedArray = firebaseMapData(data);
    return mappedArray;
}