interface RentRequest {
  id?: string;
  rentId: string;
  image: string;
  rentName: string;
  location: string;
  renter: string;
  rent: number;
  months: number;
  date: string;
  message: string;
  owner: string;
}

export default RentRequest;
