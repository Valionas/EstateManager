export const firebaseMapData = (firebaseData) => {
  const mappedData = firebaseData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return mappedData;
};
