interface RentRequest {
  id?: string;
  rentId: string;
  image: string;
  rentName: string;
  location: string;
  renter: string;
  rent: number;
  message: string;
  owner: string;
}

export default RentRequest;
