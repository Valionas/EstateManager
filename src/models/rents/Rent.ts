import RentReview from './RentReview';

interface Rent {
  id: string;
  applicants: string[];
  currencies: string;
  description: string;
  image: string;
  location: string;
  minimalRentalTime: number;
  name: string;
  owner: string;
  rent: number;
  reviews: RentReview[];
  status: string;
}

export default Rent;
