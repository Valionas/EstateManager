import User from '../auth/User';

interface RentReview {
  description: string;
  locationFactor: string;
  monthsRented: number;
  rentState: string;
  reviewRate: number;
  reviewer: User;
}

export default RentReview;
